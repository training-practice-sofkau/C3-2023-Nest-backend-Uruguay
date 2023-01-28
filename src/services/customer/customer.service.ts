import { Injectable } from '@nestjs/common';
import { CustomerRepo } from 'src/persistence/repositories/CustomerRepo';
import { AccountService } from '../account/account.service';
import { ICustomerModel } from 'src/models/i-customer-model';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { PaginationModel } from 'src/models/i-pagination-model';

@Injectable()
export class CustomerService {


    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService) { }

    createCustomer(customer: ICustomerModel) {

        const newCustomer = new CustomerEntity();

        newCustomer.documentType = customer.documentType;
        newCustomer.email = customer.email;
        newCustomer.fullName = customer.fullName;
        newCustomer.password = customer.password;
        newCustomer.phone = customer.phone;

        return this.customerRepository.register(newCustomer);
    }

    /**
     * Obtener información de un cliente
     *
     * @param {string} customerId
     * @return {*}  {CustomerEntity}
     * @memberof CustomerService
     */
    getCustomerInfo(customerId: string): CustomerEntity {

        const currentEntity = this.customerRepository.findOneById(customerId);

        return currentEntity
        
    }

    findAll(pagination: PaginationModel): CustomerEntity[] { //No esta pronto
        return this.customerRepository.findAll();
    }

    /**
     * Actualizar información de un cliente
     *
     * @param {string} id
     * @param {CustomerModel} customer
     * @return {*}  {CustomerEntity}
     * @memberof CustomerService
     */

    updatedCustomer(id: string, newCustomer: ICustomerModel): CustomerEntity {
        let customer = this.getCustomer(id);
        customer = {
            ...customer,
            ...newCustomer,
        };

        return this.customerRepository.update(id, customer);
    }


    changeState(customerId: string, state: boolean): void {
        const customer = this.getCustomer(customerId);
        customer.state = state;

        this.customerRepository.update(customerId, customer);
    }

    /**
     * Dar de baja a un cliente en el sistema
     *
     * @param {string} id
     * @return {*}  {boolean}
     * @memberof CustomerService
     */
    unsubscribe(pagination: PaginationModel, id: string): boolean {
        const accounts = this.accountService.findByCustomer(pagination, id);

        const index = accounts.findIndex((account) => account.balance != 0);

        if (index != -1) throw new Error('Cannot Delete this Customer. Your accounts need a balance of 0')

        return true;
    }

    deleteCustomer(customerId: string, soft?: boolean): void {
        
        if (soft) this.customerRepository.delete(customerId, soft);

        this.customerRepository.delete
    }



    private getCustomer(customerId: string): CustomerEntity {

        return this.customerRepository.findOneById(customerId);
    }


}

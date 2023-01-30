import { Injectable } from '@nestjs/common';
import { CustomerRepo } from 'src/persistence/repositories/CustomerRepo';
import { AccountService } from '../account/account.service';
import { ICustomerModel } from 'src/models/i-customer-model';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { PaginationModel } from 'src/models/i-pagination-model';
import { CustomerDto } from 'src/dtos/create-customer-dto';
import { DocumentTypeEntity } from 'src/persistence/entities/document-type-entity';

@Injectable()
export class CustomerService {


    constructor(private readonly customerRepository: CustomerRepo,
                private readonly accountService: AccountService) { }

    createCustomer(customer: CustomerDto) {

        const documentTypeEntity = new DocumentTypeEntity;
        documentTypeEntity.id = customer.documentType;

        const newCustomerEntity = new CustomerEntity();
        
        newCustomerEntity.documentType = documentTypeEntity;
        newCustomerEntity.email = customer.email;
        newCustomerEntity.fullName = customer.fullName;
        newCustomerEntity.password = customer.password;
        newCustomerEntity.phone = customer.phone;

        return this.customerRepository.register(newCustomerEntity);
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

    updatedCustomer(id: string, newCustomer: CustomerDto): CustomerEntity {

        const currentEntity = this.customerRepository.findOneById(id); // Creo una constante y la igualo segun Id

        const documentType = new DocumentTypeEntity(); //Creo una constante de tipo Document type Entity
        documentType.id = newCustomer.documentType; //Al ID de mi cosntante DTE le asigno el tipo de documento de mi dto

        currentEntity.documentType = documentType;
        currentEntity.document = newCustomer.document  //igualo atributos
        currentEntity.fullName = newCustomer.fullName;
        currentEntity.email = newCustomer.email;
        currentEntity.phone = newCustomer.phone;
        currentEntity.password = newCustomer.password;

        return this.customerRepository.update(id, currentEntity);
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

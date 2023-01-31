import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/business/dtos/customer.dto';
import { CustomerEntity, DocumentTypeEntity } from 'src/data/persistence';
import { CustomerRepository } from '../../../data/persistence/repositories/customer.repository';

@Injectable()
export class CustomerService {

    constructor(
        private readonly customerRepository: CustomerRepository

    ) { }
    /**
       * Obtener información de un cliente
       *
       * @param {string} customerId
       * @return {*}  {CustomerEntity}
       * @memberof CustomerService
       */
    getCustomerInfo(customerId: string): CustomerEntity {
        return this.customerRepository.findOneById(customerId)
    }

    /**
     * Actualizar información de un cliente
     *
     * @param {string} id
     * @param {CustomerModel} customer
     * @return {*}  {CustomerEntity}
     * @memberof CustomerService
     */
    updatedCustomer(id: string, customer: CustomerDto): CustomerEntity {
        const newCustomer = new CustomerEntity();
        newCustomer.id = customer.id
        newCustomer.password = customer.password
        newCustomer.fullName = customer.fullName
        newCustomer.phone = customer.phone
        newCustomer.email = customer.email
        newCustomer.documentType.id = customer.documentType
        newCustomer.document = customer.document

        return this.customerRepository.update(id, newCustomer)
    }

    /**
     * Dar de baja a un cliente en el sistema
     *
     * @param {string} id
     * @return {*}  {boolean}
     * @memberof CustomerService
     */
    unsubscribe(id: string): boolean {
        let custo = new CustomerEntity
        custo = this.customerRepository.findOneById(id)
        custo.state = false 
       return this.customerRepository.update(id,custo).state
    }

}

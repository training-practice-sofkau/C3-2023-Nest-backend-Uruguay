import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/persistence';
import { CustomerRepository } from '../../persistence/repositories/customer.repository';

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
    updatedCustomer(id: string, customer: CustomerEntity): CustomerEntity {
        return this.customerRepository.update(id, customer)
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

import { Injectable } from '@nestjs/common';

import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories';

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity {
    return this.customerRepository.update(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    let customerUpdated = this.customerRepository.findOneById(id);
    if(customerUpdated.state) {
      customerUpdated.state = false;
      this.customerRepository.update(id, customerUpdated);
      return true;
    }
    return false;
  }
  
  /**
   * Borrar un cliente
   *
   * @param {string} customerId
   * @memberof CustomerService
   */
  deleteCustomer(customerId: string): void {
    this.customerRepository.delete(customerId);
  }
  
  /**
   * Borrar un cliente de forma lógica
   *
   * @param {string} customerId
   * @memberof CustomerService
   */
  softDeleteCustomer(customerId: string): void {
    this.customerRepository.delete(customerId, true);
  }

}
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CustomerRepository } from 'src/persistence';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) { }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    try {
      return this.customerRepository.findOneById(customerId)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
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
    try {
      return this.customerRepository.update(id, customer)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    try {
      const newClient = this.customerRepository.findOneById(id)
      newClient.state = false
      this.customerRepository.update(id, newClient)
      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
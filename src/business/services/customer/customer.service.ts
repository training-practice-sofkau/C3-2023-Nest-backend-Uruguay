import { Injectable } from '@nestjs/common';
import { CustomerDtos } from 'src/business/dtos';
import { CustomerEntity } from 'src/Data';
import { CustomerRepository } from 'src/Data/persistence';

@Injectable()
export class CustomerService {

  constructor(
    private readonly CustomerRepository: CustomerRepository,    ) {}

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.CustomerRepository.searchByAttributesforOne("id", customerId)
      ;
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerDtos): CustomerEntity {
    return  this.CustomerRepository.update(id, customer)
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    this.CustomerRepository.delete(id)
    return this.CustomerRepository.searchByAttributesforOne("id", id).state 

  }
}
import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from "../../persistence/repositories/customer.repository";

@Injectable()
export class CustomerService {
  constructor(private readonly CustomerRepository: CustomerRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerModel {
    const customer = this.CustomerRepository.findOneById(customerId);  
    return customer;
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
    t
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    throw new Error('Method not implemented.');
  }
}
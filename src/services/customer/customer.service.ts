import { Injectable } from '@nestjs/common';

import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories';

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Crear una cliente
   *
   * @param {CustomerModel} account
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  createCustomer(customer: CustomerModel): CustomerEntity {
    const newACustomer = new CustomerEntity();
    newACustomer.fullName = customer.fullName;
    newACustomer.document = customer.document;
    newACustomer.documentType = customer.documentType;
    newACustomer.email = customer.email;
    newACustomer.password = customer.password;
    newACustomer.phone = customer.phone;
    newACustomer.avatarUrl = customer.avatarUrl;


    return this.customerRepository.register(newACustomer);
  }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    const customer = this.customerRepository.findOneById(customerId);
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
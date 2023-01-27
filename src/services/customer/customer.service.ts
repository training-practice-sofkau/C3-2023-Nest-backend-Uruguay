import { Injectable } from '@nestjs/common';

import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories';

@Injectable()
export class CustomerService {
    
  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Get Customer information - OK
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    
    return this.customerRepository.findOneById(customerId);
  }

  /**
   * Update Customer information - OK
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
   * Set Customer as inactive
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    
    return this.customerRepository.setCustomerAsInactive(id, false);

  }
}

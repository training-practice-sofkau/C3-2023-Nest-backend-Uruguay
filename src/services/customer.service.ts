import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../models';
import { CustomerEntity } from '../persistence/entities';
import { CustomerRepository } from '../persistence/repositories/customer.repository';

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository) {}

  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  updatedCustomer(customerId: string, customer: CustomerModel): CustomerEntity {
    return this.customerRepository.update(customerId, customer);
  }

  unsubscribe(customerId: string, soft?: boolean): boolean {
    if (this.getCustomerInfo(customerId)) {
      this.customerRepository.delete(customerId, soft)
      return true;
    } else return false;
  }
}
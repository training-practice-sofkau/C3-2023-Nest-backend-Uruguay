import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../data/persistence/entities';
import { CustomerRepository, DocumentTypeRepository } from '../../data/persistence';
import { UpdateCustomerDto } from '../../business/dtos';;

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository, private readonly documentTypeRepository: DocumentTypeRepository) {}

  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  findOneByEmailAndPassword(email: string, password: string) : CustomerEntity {
    return this.customerRepository.findOneByEmailAndPassword(email, password);
  }

  register(entity: CustomerEntity) : CustomerEntity {
    return this.customerRepository.register(entity);
  }

  updatedCustomer(customer: UpdateCustomerDto): CustomerEntity {
    const newCustomer = new CustomerEntity()
    newCustomer.documentType = this.documentTypeRepository.findOneById(customer.documentTypeId);
    newCustomer.document = customer.document;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;
    newCustomer.avatarUrl = customer.avatarUrl;
    return this.customerRepository.update(customer.customerId, newCustomer);
  }

  unsubscribe(customerId: string, soft?: boolean): boolean {
    if (this.getCustomerInfo(customerId)) {
      this.customerRepository.delete(customerId, soft)
      return true;
    } else return false;
  }
}
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

  getCustomerTypeRepo(): DocumentTypeRepository {
    return this.documentTypeRepository;
  }

  findOneByEmailAndPassword(email: string, password: string) : CustomerEntity {
    return this.customerRepository.findOneByEmailAndPassword(email, password);
  }

  register(entity: CustomerEntity) : CustomerEntity {
    return this.customerRepository.register(entity);
  }

  updatedCustomer(customer: UpdateCustomerDto): CustomerEntity {
    const oldCostumer = this.customerRepository.findOneById(customer.customerId);
    oldCostumer.document = customer.document;
    oldCostumer.email = customer.email;
    oldCostumer.fullName = customer.fullName;
    oldCostumer.password = customer.password;
    oldCostumer.phone = customer.phone;
    oldCostumer.avatarUrl = customer.avatarUrl;
    oldCostumer.documentType.name = customer.documentTypeName;
    this.documentTypeRepository.update(oldCostumer.documentType.id, oldCostumer.documentType);
    return this.customerRepository.update(customer.customerId, oldCostumer);
  }

  unsubscribe(customerId: string, soft?: boolean): boolean {
    if (this.getCustomerInfo(customerId)) {
      try{
        this.customerRepository.delete(customerId, soft)
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }
}
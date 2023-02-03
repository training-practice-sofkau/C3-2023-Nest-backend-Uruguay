import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity, DocumentTypeEntity } from '../../data/persistence/entities';
import { CustomerRepository, DocumentTypeRepository } from '../../data/persistence';
import { ChangeStateDto, PaginationDto, UpdateCustomerDto } from '../../business/dtos';
;

@Injectable()
export class CustomerService {

  private readonly customerRepository: CustomerRepository;
  private readonly documentTypeRepository: DocumentTypeRepository;

  constructor() {
    this.customerRepository = CustomerRepository.getInstance();
    this.documentTypeRepository = DocumentTypeRepository.getInstance();
  }

  getCustomerInfo(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }

  //getCustomerTypeRepo(): DocumentTypeRepository {
  //  return this.documentTypeRepository;
  //}

  findOneByEmailAndPassword(email: string, password: string) : CustomerEntity {
    return this.customerRepository.findOneByEmailAndPassword(email, password);
  }

  findSoftDeletedCustomers() : CustomerEntity[] {
    return this.customerRepository.findSoftDeletedCustomers();
  }

  register(entity: CustomerEntity) : CustomerEntity {
    return this.customerRepository.register(entity);
  }

  findByState(state: boolean) : CustomerEntity[] {
      return this.customerRepository.findByState(state.valueOf());
  }

  updateCustomer(customer: UpdateCustomerDto): CustomerEntity {
    const oldCostumer = this.customerRepository.findOneById(customer.customerId);
    if (oldCostumer) {
      oldCostumer.document = customer.document;
      oldCostumer.email = customer.email;
      oldCostumer.fullName = customer.fullName;
      oldCostumer.password = customer.password;
      oldCostumer.phone = customer.phone;
      oldCostumer.avatarUrl = customer.avatarUrl;
      oldCostumer.documentType.name = customer.documentTypeName;
      this.documentTypeRepository.update(oldCostumer.documentType.id, oldCostumer.documentType);
      return this.customerRepository.update(customer.customerId, oldCostumer);
    } else throw new NotFoundException();
  }

  unsubscribe(customerId: string, soft?: boolean): boolean {
    if (this.getCustomerInfo(customerId)) {
      try{
        this.customerRepository.delete(customerId, soft?.valueOf())
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  findAllCustomers(pagination?: PaginationDto) : CustomerEntity[] {
    return this.customerRepository.findAll(pagination);
  }

  findAllDocumentTypes(pagination?: PaginationDto) : DocumentTypeEntity[] {
    return this.documentTypeRepository.findAll(pagination);
  }

  getState(customerId: string): boolean {
    return this.customerRepository.findOneById(customerId).state;
  }

  changeState(customer: ChangeStateDto): CustomerEntity {
    const current = this.customerRepository.findOneById(customer.id);
    if (current){
      current.state = customer.state;
      return this.customerRepository.update(customer.id, current);
    } else throw new NotFoundException();
  }
}
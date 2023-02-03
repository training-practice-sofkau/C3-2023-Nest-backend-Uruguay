import { HttpException, Injectable } from '@nestjs/common';

import { CustomerEntity, DocumentTypeEntity } from '../../../data/persistence/entities';
import { CustomerRepository } from '../../../data/persistence/repositories';
import { PaginationDto, CustomerDto, DocumentTypeDto, UpdateCustomerDto } from '../../dtos';
import { DocumentTypeRepository } from '../../../data/persistence/repositories/document-type.repository';

@Injectable()
export class CustomerService {

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository) {}

  /**
   * Crear una cliente
   */
  createCustomer(customer: CustomerDto): CustomerEntity {

    const documentTypeExisting = this.documentTypeRepository.findOneById(customer.documentType);

    const newACustomer = new CustomerEntity();
    newACustomer.fullName = customer.fullName;
    newACustomer.document = customer.document;
    newACustomer.documentType = documentTypeExisting;
    newACustomer.email = customer.email;
    newACustomer.password = customer.password;
    newACustomer.phone = customer.phone;
    
    if(customer.avatarUrl) newACustomer.avatarUrl = customer.avatarUrl;

    return this.customerRepository.register(newACustomer);
  }

  /**
   * Obtener información de un cliente
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    const customer = this.customerRepository.findOneById(customerId);
    return customer;
  }

  /**
   * Actualizar información de un cliente
   */
  updatedCustomer(id: string, customer: UpdateCustomerDto): CustomerEntity {
    let customerUpdated = this.customerRepository.findOneById(id);

    if(customer.avatarUrl) customerUpdated.avatarUrl = customer.avatarUrl;
    if(customer.daletedAt) customerUpdated.deletedAt = customer.daletedAt;
    if(customer.document) customerUpdated.document = customer.document;
    if(customer.documentType) {
      let documentTypeExisting = this.documentTypeRepository.findOneById(customer.documentType);
      customerUpdated.documentType = documentTypeExisting;
    }
    if(customer.email) customerUpdated.email = customer.email;
    if(customer.fullName) customerUpdated.fullName = customer.fullName;
    if(customer.password) customerUpdated.password = customer.password;
    if(customer.state) customerUpdated.state = customer.state;
    if(customer.phone) customerUpdated.phone = customer.phone;
    
    return this.customerRepository.update(id, customerUpdated);
  }

  /**
   * Dar de baja a un cliente en el sistema
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
   */
  deleteCustomer(customerId: string): void {
    this.customerRepository.delete(customerId);
  }
  
  /**
   * Borrar un cliente de forma lógica
   */
  softDeleteCustomer(customerId: string): void {
    this.customerRepository.delete(customerId, true);
  }

  /**
   * Obtener la lista de clientes
   */
  findAllCustomers(pagination?: PaginationDto): CustomerEntity[] {
    const customers = this.customerRepository.findAll();
    let customersPaginated: CustomerEntity[] =[];

    if(pagination) {
      return customersPaginated = customers.slice(pagination.offset, pagination.limit);
    }
    return customers;
  }

  /**
   * Cambiar el estado de un cliente
   */
  changeState(customerId: string, state: boolean): void {
    try {
      let customerUpdated = this.customerRepository.findOneById(customerId);
      customerUpdated.state = state;
      this.customerRepository.update(customerId, customerUpdated);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }


  findOneByEmailAndPassword(email: string, password: string): boolean {
    return this.customerRepository.findOneByEmailAndPassword(email, password);
  }

  findOneByDocumentTypeAndDocument(documentTypeId: string, document: string): CustomerEntity {
    return this.customerRepository.findOneByDocumentTypeAndDocument(documentTypeId, document);
  }

  findOneByEmail(email: string): CustomerEntity {
    return this.customerRepository.findOneByEmail(email);
  }

  findOneByPhone(phone: string): CustomerEntity {
    return this.customerRepository.findOneByPhone(phone);
  }

  findByState(state: boolean): CustomerEntity[] {
    return this.customerRepository.findByState(state);
  }

  findByFullName(fullName: string): CustomerEntity[] {
    return this.customerRepository.findByFullName(fullName);
  }


  
  createDocumentType(dto: DocumentTypeDto): DocumentTypeEntity {
    let newDocumentType = new DocumentTypeEntity();

    newDocumentType = {
      ...newDocumentType,
      ...dto
    }
    this.documentTypeRepository.register(newDocumentType);
    return newDocumentType;
  }

  updateDocumentType(id: string, dto: DocumentTypeDto): DocumentTypeEntity {
    let documentTypeUpdated = this.documentTypeRepository.findOneById(id);
    
    documentTypeUpdated.name = dto.name;
    documentTypeUpdated.state = dto.state;

    return this.documentTypeRepository.update(id, documentTypeUpdated);
  }

  deleteDocumentType(id: string): void {
    this.documentTypeRepository.delete(id);
  }

  findAllDocumentType(): DocumentTypeEntity[] {
    return this.documentTypeRepository.findAll();
  }

  findOneDocumentType(id: string): DocumentTypeEntity {
    return this.documentTypeRepository.findOneById(id);
  }
}
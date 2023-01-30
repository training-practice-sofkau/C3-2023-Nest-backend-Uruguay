import { Injectable } from '@nestjs/common';

import { CustomerModel, PaginationModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories';
import { CustomerDto } from '../../dtos';

@Injectable()
export class CustomerService {

  constructor(private readonly customerRepository: CustomerRepository) {}

  /**
   * Crear una cliente
   */
  createCustomer(customer: CustomerDto): CustomerEntity {
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
   */
  getCustomerInfo(customerId: string): CustomerDto {
    const customer = this.customerRepository.findOneById(customerId);
    return customer;
  }

  /**
   * Actualizar información de un cliente
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerDto {
    return this.customerRepository.update(id, customer);
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
  findAllCustomers(pagination?: PaginationModel): CustomerDto[] {
    const customers = this.customerRepository.findAll();
    let customersPaginated: CustomerDto[] =[];

    if(pagination) {
      return customersPaginated = customers.slice(pagination.offset, pagination.limit);
    }
    return customers;
  }

}
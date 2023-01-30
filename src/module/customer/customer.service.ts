import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from "./customer.repository";
import { CustomerEntity } from 'src/module/customer/customer.entity';
import { AccountRepository } from '../account/Account.Repositories/account.repository';
import { DocumentTypeEntity } from './document-type-Entity';
import { CustomerDto } from './dto/customer.dto';





@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository : AccountRepository) {}
  /**
   * Obtener información de un cliente
   */
  createCustomer(customer: CustomerDto) {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentType;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;

    return this.customerRepository.register(newCustomer);
  }


  getCustomerInfo(customerId: string): CustomerEntity {
    let customer = this.customerRepository.findOneById(customerId);  
    return customer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  /**
   * Actualizar información de un cliente
   */
  updatedCustomer(id: string, newCustomer: CustomerDto ): CustomerEntity{
    let customer = this.customerRepository.findOneById(id);
    
    
    const documentType = new DocumentTypeEntity();
    documentType.id = newCustomer.documentType;

    
    customer.documentType = documentType;

    customer.document = newCustomer.document;
    customer.fullName = newCustomer.fullName;
    customer.email = newCustomer.email;
    customer.phone = newCustomer.phone;
    customer.password = newCustomer.password;

    return this.customerRepository.update(id,customer);
    
  }

  /**
   * Dar de baja a un cliente en el sistema
   */
  unsubscribe(id: string): boolean {

    const customers = this.accountRepository.findByCustomer(id);
    const index = customers.findIndex(item => item.balance != 0);

    if(!index) throw new NotFoundException(`Id : ${id} no tiene cuentas con balance 0`);
    
    return true;

  }

  changeState(customerId: string ,state: boolean): void {
    const customer = this.customerRepository.findOneById(customerId);
    customer.state = state;

    this.customerRepository.update(customerId, customer);
  }

  deleteCustomer(customerId: string, soft?: boolean): void {
    if(soft) this.customerRepository.delete(customerId, soft);

    this.customerRepository.delete(customerId);
  }

}
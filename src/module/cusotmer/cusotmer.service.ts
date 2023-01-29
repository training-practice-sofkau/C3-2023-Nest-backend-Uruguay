import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from "./customer.repository";
import { CustomerEntity } from 'src/module/cusotmer/customer.entity';
import { AccountRepository } from '../account/Account.Repositories/account.repository';
import { CustomerModel } from './customer.model';
import { accountType } from 'src/models';
import { AccountTypeRepository } from '../account/Account.Repositories/account-type.repository';


@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository : AccountRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  createCustomer(customer: CustomerModel) {
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = customer.documentType;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;

    return this.customerRepository.register(newCustomer);
  }


  getCustomerInfo(customerId: string): CustomerModel {
    let customer = this.customerRepository.findOneById(customerId);  
    return customer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, newCustomer: CustomerModel): CustomerEntity{
    let customer = this.customerRepository.findOneById(id);
    customer = {
      ...customer,
      ...newCustomer,
    };
    return this.customerRepository.update(id,customer);
    
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
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
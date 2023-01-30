import { Injectable } from '@nestjs/common';


import { UpdateCustomerDto } from '../../dtos';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository, AccountRepository } from '../../persistence/repositories';
import { DocumentTypeEntity } from '../../persistence/entities/document-type.entity';


@Injectable()
export class CustomerService {
  

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountRepository: AccountRepository) { }

  /**
   * Get Customer information - OK   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {

    return this.customerRepository.findOneById(customerId);
  }

  /**
   * Update Customer information - OK   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, newCustomerDetails: UpdateCustomerDto): CustomerEntity {

    const customer = new CustomerEntity();

    const documentType = new DocumentTypeEntity();
    documentType.id = newCustomerDetails.documentTypeId;
    customer.documentType = documentType;

    customer.document = newCustomerDetails.document;
    customer.email = newCustomerDetails.email;
    customer.fullname = newCustomerDetails.fullname;
    customer.password = newCustomerDetails.password;
    customer.phone = newCustomerDetails.phone;
    customer.state = newCustomerDetails.state;
    customer.avatarUrl = newCustomerDetails.avatarUrl;

    return this.customerRepository.update(id, customer);

  }

  /**
   * Returns all the customers in the DB
   * @returns array of entities
   */
  getAll(): CustomerEntity[]  {
    
   return this.customerRepository.findAll(); 
  }

  /**
   * Set Customer as inactive   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {

    if (this.checkCustomerBalance(id) == 0) {
      return this.customerRepository.setCustomerState(id, false);
    }
    return true; //the customer state has not change
  }

  /**
   * Find all the accounts of a customer and return the total balance
   * @param id customer id to find
   * @returns balance 
   */
  private checkCustomerBalance(id: string): number {

    let accounts = this.accountRepository.findBy("customerId", id);

    let balance = 0;

    if (accounts.length > 0) {
      accounts.forEach(element => {
        balance += element.balance;
      });
    }
    return balance;
  }

  /**
   * Set Customer as active
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  subscribe(id: string): boolean {

    return this.customerRepository.setCustomerState(id, true);

  }

}

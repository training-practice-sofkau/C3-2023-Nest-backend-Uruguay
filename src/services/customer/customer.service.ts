import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../persistence/entities/';
import { CustomerModel } from '../../models/';
import { CustomerRepository } from '../../persistence/repositories/';
import { AccountService } from '../account/';
import { v4 as uuid } from 'uuid';
import { isNullOrUndefined } from 'util';
import { PaginationModel } from '../../models/pagination-model.model';
import { CreateCustomerDTO } from '../../dtos/create-customer.dto';
import { DocumentTypeRepository } from '../../persistence/repositories/document-type.repository';
import { UpdateCustomerDTO } from '../../dtos/update-customer.dto';
@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository: DocumentTypeRepository,
  ) {}

  createCustomer(customer: CreateCustomerDTO) {
    const documentType = this.documentTypeRepository.findOneById(
      customer.documentType,
    );

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;

    return this.customerRepository.register(newCustomer);
  }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.getCustomer(customerId);
  }

  findAll(pagination: PaginationModel): CustomerEntity[] {
    return this.customerRepository.findAll(pagination);
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */

  updatedCustomer(id: string, newCustomer: UpdateCustomerDTO): CustomerEntity {
    let customer = this.getCustomer(id);
    const documentType = this.documentTypeRepository.findOneById(
      newCustomer.documentType,
    );

    customer.documentType = documentType;
    customer.document = newCustomer.document;
    customer.email = newCustomer.email;
    customer.fullName = newCustomer.fullName;
    customer.password = newCustomer.password;
    customer.phone = newCustomer.phone;
    customer.state = newCustomer.state;

    return this.customerRepository.update(id, customer);
  }

  changeState(customerId: string, state: boolean): void {
    const customer = this.getCustomer(customerId);
    customer.state = state;

    this.customerRepository.update(customerId, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const accounts = this.accountService.findByCustomer(id);

    const index = accounts.findIndex((account) => account.balance != 0);

    if (index != -1)
      throw new Error(
        'Cannot Delete this Customer. Your accounts need a balance of 0',
      );
      
    this.customerRepository.delete(id, true);

    return true;
  }

  deleteCustomer(customerId: string): void {
      this.customerRepository.delete(customerId);
  }

  private getCustomer(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }
}

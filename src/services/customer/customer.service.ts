import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerRepository } from '../../persistence/repositories/customer.repository';
import { AccountRepository } from '../../persistence/repositories/account.repository';

@Injectable()
export class CustomerService {

  [x: string]: any;
  constructor(
    private readonly CustomerRepository: CustomerRepository,  private readonly AccountRepository: AccountRepository
  ) {}

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.CustomerRepository.searchByAttributesforOne("id", customerId)
      ;
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity {
    this.CustomerRepository.update(id, customer)
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    return  this.AccountRepository.getStateAndChange(id, true)
  }
}
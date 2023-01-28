import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerRepository } from "../../persistence/repositories/customer.repository";
import { CustomerEntity } from 'src/persistence/entities/customer.entity';


@Injectable()
export class CustomerService {
  constructor(private readonly CustomerRepository: CustomerRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerModel {
    const customer = this.CustomerRepository.findOneById(customerId);  
    return customer;
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerModel): CustomerEntity{
    const cust = this.CustomerRepository.update(id,customer);
    return cust;
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const cust = this.CustomerRepository.findOneById(id);
    cust.state = false;
    this.CustomerRepository.update(id,cust);
    return cust.state;
  }
}
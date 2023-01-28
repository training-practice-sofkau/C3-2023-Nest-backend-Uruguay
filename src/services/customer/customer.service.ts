import { Injectable } from '@nestjs/common';
import { CustomerEntity, CustomerRepository } from '../../persistence';
import { CustomerModel } from '../../models';


@Injectable()
export class CustomerService {
    constructor(private readonly costumerRepository: CustomerRepository) {}
  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    let customer = new CustomerEntity
    customer = this.costumerRepository.findOneById(customerId)
    return customer
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
    let customerU = new CustomerEntity
    customerU = this.costumerRepository.update(id,customerU)
    return customerU
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    let unsubscribe = new CustomerEntity
    unsubscribe = this.costumerRepository.findOneById(id)
    if(unsubscribe.state == true){
      unsubscribe.state = false
    }
    return unsubscribe.state
  }
}
import { Injectable } from '@nestjs/common';
import { CustomerEntity, CustomerRepository } from '../../persistence';
import { CustomerDto } from '../../dtos/customer.dto';

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
  
    return this.costumerRepository.findOneById(customerId);
    
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  updatedCustomer(id: string, customer: CustomerDto): CustomerEntity {
   
    return this.costumerRepository.update(id, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    
    let unsubscribe = this.costumerRepository.findOneById(id);
    if (unsubscribe.state == true) {
      unsubscribe.state = false;
      this.costumerRepository.update(id,unsubscribe)
    }
    return unsubscribe.state;
  }
}

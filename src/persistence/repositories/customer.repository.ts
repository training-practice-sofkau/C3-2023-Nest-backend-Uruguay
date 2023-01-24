import { Injectable } from '@nestjs/common/decorators';
import { CustomerEntity } from '../entities';
import { RepositoryMethodsInterface } from './interfaces';
import { BankInternalControl } from './base/BankInternalControl';

@Injectable()
export class CustomerRepository extends BankInternalControl<CustomerEntity> {
    
  
  

  
}
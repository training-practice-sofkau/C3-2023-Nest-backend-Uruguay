import { Injectable } from '@nestjs/common/decorators';
import { CustomerEntity } from '../entities';
import { BankInternalControl } from './base';

@Injectable()
export class CustomerRepository extends BankInternalControl<CustomerEntity> {
    
  
  

  
}
import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { Repository } from './base/repository.base';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity>{
  
}
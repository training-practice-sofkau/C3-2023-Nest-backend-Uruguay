import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { Repository } from './base/Repository';


@Injectable()
export class CustomerRepository extends Repository<CustomerEntity>  {
  
}
import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepo } from './base/base-abstract-Repos';

@Injectable()
export class CustomerRepository  extends BaseRepo<CustomerEntity> {

  
}
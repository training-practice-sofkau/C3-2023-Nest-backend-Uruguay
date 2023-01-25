import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base';
import { CustomerEntity } from '../entities';

@Injectable()
export class CustomerRepository extends GeneralCRUD<CustomerEntity> {

  constructor() {
    super();
  }
}
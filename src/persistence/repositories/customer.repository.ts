import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class CustomerRepository extends GeneralCRUD<CustomerEntity> {

  constructor() {
    super();
  }
}
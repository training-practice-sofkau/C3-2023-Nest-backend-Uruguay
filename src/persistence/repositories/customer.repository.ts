import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepo } from '../';

@Injectable()
export class CustomerRepository extends BaseRepo<CustomerEntity> {}

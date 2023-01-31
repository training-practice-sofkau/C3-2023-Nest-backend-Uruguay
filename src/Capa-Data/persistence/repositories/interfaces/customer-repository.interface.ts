import { BaseRepositoryInterface } from './base';
import { CustomerEntity } from '../../entities';

export type CustomerRepositoryInterface =
  BaseRepositoryInterface<CustomerEntity>;

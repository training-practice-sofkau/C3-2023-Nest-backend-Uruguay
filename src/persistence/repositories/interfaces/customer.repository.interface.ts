import { ICRUD } from './base/CRUD.interface';
import { CustomerEntity } from '../../entities/customer.entity';

export interface CustomerRepositoryInterface extends ICRUD<CustomerEntity>{}
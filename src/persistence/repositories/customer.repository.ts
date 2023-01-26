import { Injectable } from '@nestjs/common';
import { CustomerEntity, DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';

@Injectable()
export class CustomerRepository extends Base {
  private readonly database: Array<CustomerEntity>;

  constructor() {
    super();
    this.database = new Array<CustomerEntity>();
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }
}
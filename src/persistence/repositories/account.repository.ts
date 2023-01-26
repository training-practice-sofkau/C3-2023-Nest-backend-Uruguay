import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';


@Injectable()
export class DocumentTypeRepository  extends Base{
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
      super();
    this.database = new Array<DocumentTypeEntity>();
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
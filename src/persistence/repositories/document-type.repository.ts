import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { TypesCRUD } from './base/TypesCRUD.base';

@Injectable()
export class DocumentTypeRepository extends TypesCRUD implements DocumentTypeEntity {
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
    super();
    this.database = new Array<DocumentTypeEntity>();
  }
}
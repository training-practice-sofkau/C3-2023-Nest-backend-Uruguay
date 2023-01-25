import { Injectable } from '@nestjs/common';
import { GeneralCRUD } from './base';
import { DocumentTypeEntity } from '../entities';

@Injectable()
export class DocumentTypeRepository extends GeneralCRUD<DocumentTypeEntity> {

  constructor() {
    super();
  }
}
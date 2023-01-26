import { Injectable } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { DocumentTypeEntity } from '../entities';

@Injectable()
export class DocumentTypeRepository extends GeneralCRUD<DocumentTypeEntity> {

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

  findByState(state: boolean): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}
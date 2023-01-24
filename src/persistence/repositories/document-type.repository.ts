import { Injectable } from '@nestjs/common';
import { Repository } from './base/repository.base';
import { DocumentTypeEntity } from '../entities/document-type.entity';

@Injectable()
export class DocumentTypeRepository extends Repository<DocumentTypeEntity>{
  
}
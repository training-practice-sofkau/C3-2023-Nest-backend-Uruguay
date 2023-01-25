import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/classAbstract';

@Injectable()
export class DocumentTypeRepository extends Base<DocumentTypeEntity>{
 
}
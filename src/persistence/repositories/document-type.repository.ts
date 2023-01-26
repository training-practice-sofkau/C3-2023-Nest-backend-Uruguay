import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/class-abstract';

@Injectable()
export class DocumentTypeRepository extends Base<DocumentTypeEntity>{
 
}
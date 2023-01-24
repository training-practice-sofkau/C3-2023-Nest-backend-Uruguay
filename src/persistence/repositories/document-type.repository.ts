import { Injectable } from '@nestjs/common/decorators';
import { DocumentTypeEntity } from '../entities';
import { BankInternalControl } from './base';

@Injectable()
export class DocumentTypeRepository extends BankInternalControl <DocumentTypeEntity>{
    
}
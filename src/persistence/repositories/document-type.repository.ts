import { Injectable } from '@nestjs/common/decorators';
import { DocumentTypeEntity } from '../entities';
import { BankInternalControl } from './base/BankInternalControl';

@Injectable()
export class DocumentTypeRepository extends BankInternalControl <DocumentTypeEntity>{
    
}
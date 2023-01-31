
import { v4 as uuid } from 'uuid';
import { DocumentTypeModel } from '../models/document-type.model';
export class DocumentTypeEntity implements DocumentTypeModel{
    
    id = uuid();
    name: string;
    state = true;

}


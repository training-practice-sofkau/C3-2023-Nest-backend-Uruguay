import { DocumentTypeModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class DocumentTypeEntity implements DocumentTypeModel {
    id = uuid()
    name: string
    state = true
}
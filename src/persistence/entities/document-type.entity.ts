import { DocumentTypeModel } from '../../models';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class DocumentTypeEntity extends GeneralCRUD<DocumentTypeModel> implements DocumentTypeModel{
    id = uuid();
    name: string;
    state = true;
}
import { DocumentTypeModel } from '../../models';
import { v4 as uuid } from 'uuid';
import { GeneralCRUD } from '../repositories';

export class DocumentTypeEntity extends GeneralCRUD<DocumentTypeModel> implements DocumentTypeModel{
    id = uuid();
    name: string;
    state = true;
}
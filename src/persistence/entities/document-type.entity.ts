import { v4 as uuid } from 'uuid';

export class DocumentTypeEntity{
    id = uuid();
    name: string;
    state = true;
}
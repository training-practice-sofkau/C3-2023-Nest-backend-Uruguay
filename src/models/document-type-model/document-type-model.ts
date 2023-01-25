import { v4 as uuid } from 'uuid';

export class DocumentTypeModel {

    id = uuid();
    name: string;
    state = true;
    
}



import { v4 as uuid } from 'uuid';

import { DocumentTypeModel } from '../../models';

export class DocumentTypeEntity implements DocumentTypeModel{
    doctp_id =  uuid();
    doctp_name: string;
    doctp_state: boolean;
   
}
import { CustomerModel, DocumentTypeModel } from 'src/data/models';
import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel {
    id = uuid()
    documentType: DocumentTypeModel
    document: string
    fullName: string
    email: string
    phone: string
    password: string
    avatarUrl?: string
    state = true
    deletedAt?: number | Date
}
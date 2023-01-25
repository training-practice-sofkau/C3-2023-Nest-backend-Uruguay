import { CRUDRepo } from './interfaces/CRUD.interface';
import { DocumentTypeEntity } from '../entities/document_type.entity';
export class DocumentTypeRepository implements CRUDRepo {
    private readonly database: Array<DocumentTypeEntity>;

    constructor() {
        this.database = new Array<DocumentTypeEntity>;
    }

    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: DocumentTypeEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): DocumentTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }

}

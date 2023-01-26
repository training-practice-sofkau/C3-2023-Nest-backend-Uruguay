import { CRUD } from "../interfaces/crud";
import { DocumentTypeEntity } from '../../entities/document-type.entity';

export abstract class Base implements CRUD<DocumentTypeEntity>{
    
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error("Method not implemented.");
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll(): DocumentTypeEntity[] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): DocumentTypeEntity {
        throw new Error("Method not implemented.");
    }

    
}
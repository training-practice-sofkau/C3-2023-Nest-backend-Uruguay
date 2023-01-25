import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepositories } from '../';

@Injectable()
export class DocumentTypeRepository implements BaseRepositories<DocumentTypeEntity> {
    findAll(): DocumentTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}

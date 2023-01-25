import { Injectable } from '@nestjs/common/decorators';
import { DocumentTypeEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository extends BankInternalControl <DocumentTypeEntity> implements RepositoryMethodsInterface<DocumentTypeEntity>{
    
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    
    findAll(): DocumentTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    
    findOneById(id: string): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    
}
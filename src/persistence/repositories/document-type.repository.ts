import { Injectable } from '@nestjs/common/decorators';
import { DocumentTypeEntity } from '../entities';
import { RepositoryMethodsInterface } from './interfaces/repositoryMethods.interface';

@Injectable()
export class DocumentTypeRepository implements RepositoryMethodsInterface<DocumentTypeEntity>{
  private readonly database: Array<DocumentTypeEntity>;

  constructor() {
    this.database = new Array<DocumentTypeEntity>();
  }
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
import { DocumentTypeEntity } from '../../entities/document-type.entity';
import { ICRUD } from './base/CRUD.interface';

export interface DocumentTypeRepositoryInterface extends ICRUD<DocumentTypeEntity>{}
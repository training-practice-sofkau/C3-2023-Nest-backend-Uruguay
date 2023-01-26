import { DocumentTypeEntity } from '../../entities/document-type.entity';
import { ICRUD, TypesMethodsInterface } from './base/';

export interface DocumentTypeRepositoryInterface extends ICRUD<DocumentTypeEntity>, TypesMethodsInterface<DocumentTypeEntity> {

}
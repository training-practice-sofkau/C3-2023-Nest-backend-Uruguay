import { DocumentTypeEntity } from '../../entities/';
import { ICRUD, TypesMethodsInterface } from './base/';

export interface DocumentTypeRepositoryInterface extends ICRUD<DocumentTypeEntity>, TypesMethodsInterface<DocumentTypeEntity> {

}
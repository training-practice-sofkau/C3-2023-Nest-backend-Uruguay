import { FindStateInterface } from './';
import { PaginationModel } from '../../../../models/';

export interface TypesMethodsInterface<T> extends FindStateInterface<T> {
    
    findByName(pagination: PaginationModel ,name: string): T[];
}
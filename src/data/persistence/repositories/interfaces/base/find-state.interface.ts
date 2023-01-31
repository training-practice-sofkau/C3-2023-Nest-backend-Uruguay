import { PaginationModel } from '../../../../models/';
export interface FindStateInterface<T> {
    
    findByState(pagination: PaginationModel ,state: boolean): T[];
}
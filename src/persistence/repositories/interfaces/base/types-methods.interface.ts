import { FindStateInterface } from './';

export interface TypesMethodsInterface<T> extends FindStateInterface<T> {
    
    findByName(name: string): T[];
}
export interface FindStateInterface<T> {
    
    findByState(state: boolean): T[];
}
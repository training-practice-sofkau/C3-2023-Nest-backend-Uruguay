export interface ServiceInterface {

    register(entity: object): object;

    update(id: string, entity: object): object;
    
    delete(id: string, soft?: boolean): void ;
    
    findAll(): object[];
    
    findOneById(id: string): object;

}
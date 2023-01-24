//Definir los metodos que van a ser usados en repository, recibe argumento T generico
//Export para mandarlo al futuro
//Si queremos crear un repo que siga las siguiente estructura utilizamos esta plantilla
export interface InterfaceRepo <T>{
    
    register(entity: T): T;
    update(entity: T, id:string): T;
    delete(id:string, soft?: boolean): void;
    findAll([]):T;
    findOneById(id: string): T;
    


    
   
   
    // update(id: string, entity: CustomerEntity): CustomerEntity {
    //     throw new Error('This method is not implemented');
      }


 
        
      

import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from "./repo-base/base-repository";
import { AccountEntity } from "../entities/account-entity";
import { IAccountModel } from "src/models/i-account-model";


@Injectable()
export class AccountRepository extends BaseRepository<AccountEntity>  implements AccountRepository{
  
    register(entity: AccountEntity): AccountEntity {

    this.database.push(entity);

    return this.database.at(-1) ?? entity;

    }
  

    update(id: string, entity: AccountEntity): AccountEntity {

      const indexCurrentEntity = this.database.findIndex((obj) => obj.id === id && typeof obj.daletedAt === 'undefined');

      if (indexCurrentEntity >= 0)
          this.database[indexCurrentEntity] = {...this.database[indexCurrentEntity],...entity,id,
      } 
      else throw new NotFoundException('Lo siento, nada por aquí =(');

      return this.database[indexCurrentEntity];
    }


    private hardDelete(index: number): void {

      this.database.splice(index,1);
    }   
  
    private softDelete(index: number): void {
      
      this.database[index].daletedAt = Date.now();
    }

  
    delete(id: string, soft?: boolean): void {

      const index = this.database.findIndex(objIndex => objIndex.id === id);

      if(!index ) throw new NotFoundException;

      if (soft) {
          this.softDelete(index);
      } else {
          this.hardDelete(index);
      }
    }
  

    findAll(): AccountEntity[] {

      return this.database.filter((obj) => typeof obj.daletedAt === 'undefined');
    }
  


    findOneById(id: string): IAccountModel {

      const currentEntity = this.database.find((obj) => obj.id === id && typeof obj.daletedAt === 'undefined');

      if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí =(');

      return currentEntity;
    }



    findByState(state: boolean): AccountEntity[] {
      
      return this.database.filter((obj) => obj.state && typeof obj.daletedAt === 'undefined');
    }


  findByCustomer(customerId: string): AccountEntity[] {

    const currentEntity = this.database.filter((obj) => obj.customerId.id === customerId && typeof obj.daletedAt === 'undefined');
    
    if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí =(');
    
    return currentEntity;
  }


  findByAccountType(accountTypeId: string): AccountEntity[] {

    const currentEntity = this.database.filter((item) => item.accountTypeId.id === accountTypeId && typeof item.daletedAt === 'undefined');
    
    if(!currentEntity ) throw new NotFoundException('Lo siento, nada por aquí =(');

    return currentEntity;
  }

//Metodos Jornada de hoy

  findIndexById(id: string): number {
            
        const index = this.database.findIndex(obj => obj.id === id && typeof obj.daletedAt === undefined ) ; 

        if(index == -1) { throw new NotFoundException('Lo siento, nada por aquí =('); }

        return index; 

    }

    //Agregar monto al balance
    addAmount(accountId: string, amount: number){

      const index  = this.findIndexById(accountId);

      if (index == -1){
        throw new NotFoundException('Lo siento, nada por aquí =('); 
      }

      this.database[index].balance += amount

    }
    

    


}
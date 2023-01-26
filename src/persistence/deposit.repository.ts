import { Injectable, NotFoundException } from '@nestjs/common';


import { DepositRepositoryInterface } from './interfaces/';
import { Deposit } from './entities/deposit.entities';
import { BaseRepository } from './repositories';

@Injectable()
export class DepositRepository
    extends BaseRepository<Deposit>
    implements DepositRepositoryInterface {

    register(entity: Deposit): Deposit {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: Deposit): Deposit {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.dep_id === id && typeof item.dep_delete_at === 'undefined',
        );

        if(indexCurrentEntity <= 0){
            throw new NotFoundException(`No se pudo actualizar porque no se encontro el id : ${id}`)
        }
          
        this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as Deposit;
         
        return this.database[indexCurrentEntity];
    }


    findAll(): Deposit[] {

        return this.database.filter(
            (item) => typeof item.dep_delete_at === 'undefined',
        );
    }

    findOneById(id: string): Deposit {
        const currentEntity = this.database.find(
            (item) => item.dep_id === id && typeof item.dep_delete_at === 'undefined',
          );

          if (!currentEntity){
            throw new NotFoundException();
          }
          return currentEntity; 
    }

    findByAccountId(accountId: string): Deposit[] {
        const indexCurrentEntity = this.database.find(
            (item) =>
              item.account_id === accountId &&
              typeof item.dep_delete_at === 'undefined',
          );
          //Si no hay cliente con este fullName entonces mando un exepcion
          if(!indexCurrentEntity){
            throw new NotFoundException(`account Id : ${accountId} not found`);
          }
          
          //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese fullName
          const cpAccountId : Deposit[] = [];
          for(let i = 0; i<this.database.length; i++){
            if(this.database[i].account_id === accountId){
                cpAccountId[i] = this.database[i];
            }
          }
         
          return cpAccountId;
    }

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
    ): Deposit[] {
        throw new Error('This method is not implemented');
    }

    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }
}
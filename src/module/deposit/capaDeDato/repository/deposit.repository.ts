import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';

import { DepositRepositoryInterface } from './deposit-repository.interface';
import { BaseRepository } from 'src/module/base/repositories';
import { DepositEntity } from '../entity';


@Injectable()
export class DepositRepository
    extends BaseRepository<DepositEntity>
    implements DepositRepositoryInterface {

    register(entity: DepositEntity): DepositEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === entity.id && typeof item.delete_at === 'undefined',
        );

        if(indexCurrentEntity != -1){
            throw new NotFoundException(`Se encontro un id : ${entity.id}(deposito ) ya existente`)
        }
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: DepositEntity): DepositEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.delete_at === 'undefined',
        );

        if(indexCurrentEntity === -1){
            throw new NotFoundException(`No se pudo actualizar porque no se encontro el id : ${id}(deposito)`)
        }
          
        this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as DepositEntity;
         
        return this.database[indexCurrentEntity];
    }


    findAll(): DepositEntity[] {

        return this.database.filter(
            (item) => typeof item.delete_at === 'undefined',
        );
    }

    findOneById(id: string): DepositEntity {
        const currentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.delete_at === 'undefined',
          );

          if (currentEntity === -1){
            throw new NotFoundException(`No se encontro deposito con id : ${id}`);
          }
          return this.database[currentEntity]; 
    }

    findByAccountId(accountId: string): DepositEntity[] {
        const cpAccountId = this.database.filter(item => item.account.id === accountId && typeof item.delete_at === `undefined` );  
        if(!cpAccountId){
            throw new NotFoundException(`account Id : ${accountId} not found`);
        }
        return cpAccountId;
    }

    delete(id: string, soft?: boolean): void {
        const indexdelete = this.database.findIndex((item) => item.id === id && typeof item.delete_at === `undefined`);
        soft ? this.softDelete(indexdelete) : this.hardDelete(indexdelete);
    }

    private hardDelete(index: number): void {
    
        if (index < 0 ){
            throw new NotAcceptableException(`No se aceptan valores negativos`);
        }
        this.database.splice(index,1);
        
    }

    private softDelete(index: number): void {
        
        if (index < 0){
            throw new NotAcceptableException(`No se aceptan valores negativos`);
        }

        this.database[index].delete_at = Date.now(); 

    }

    findByDataRange(dateInit: Date | number,dateEnd: Date | number,): DepositEntity[] {
        const rango  = this.database.filter( item => item.date_time >= dateInit && item.date_time <= dateEnd && typeof  item.delete_at === `undefined`);
        if(typeof rango === `undefined`){
            throw new NotFoundException();
        }
        return rango;

    }

    
}
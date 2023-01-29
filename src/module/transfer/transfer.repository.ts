import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { TransferEntity } from './transfer.entities';
import { TransferRepositoryInterface } from './transfer-repository.interface';
import { BaseRepository } from '../base';
import { transferModel } from './transfer.model';



@Injectable()
export class TransferRepository
    extends BaseRepository<TransferEntity>
    implements TransferRepositoryInterface {


    register(entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === entity.id && typeof item.delete_at === 'undefined',
            );

        if (indexCurrentEntity <= 0){
            throw new NotFoundException(`Id : ${entity.id} not found`);
        }

        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }


    update(id: string, entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.delete_at === 'undefined',
            );

        if (indexCurrentEntity <= 0){
            throw new NotFoundException(`Id : ${id} not found`);
        }
        
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as TransferEntity;
    }



    delete(id: string, soft?: boolean): void {
        const indexdelete = this.database.findIndex(index => index.id === id && typeof index.delete_at === `undefined`);
        soft ? this.softDelete(indexdelete) : this.hardDelete(indexdelete);
    }
    
    private hardDelete(index: number): void {
    
        if (index < 0 )throw new NotAcceptableException(`No se aceptan valores negativos`);
        this.database.splice(index,1);
    }
    
    private softDelete(index: number): void {
    
        if (index < 0) throw new NotAcceptableException(`No se aceptan valores negativos`);
        
        this.database[index].delete_at = new Date; 
    }


    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.delete_at === 'undefined',
        );
    }


    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.find(
        (item) => item.id === id && typeof item.delete_at === 'undefined',
        );
        if(!currentEntity)throw new NotFoundException(`id : ${id} not found `);

        return currentEntity;
    }


    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const rango  = this.database.filter(
            item => item.outcome.id === accountId 
            && item.date_time>=dateInit 
            && item.date_time === dateEnd 
            && typeof  item.delete_at === `undefined`);
        if(typeof rango === `undefined`)throw new NotFoundException();
        return rango;
    }


    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number):
        TransferEntity[] {
        const rango  = this.database.filter(item => item.income.id === accountId 
            && item.date_time>=dateInit && 
            item.date_time <= dateEnd &&
            typeof  item.delete_at === `undefined`);
        if(typeof rango === `undefined`)throw new NotFoundException();
        return rango;
    }



}
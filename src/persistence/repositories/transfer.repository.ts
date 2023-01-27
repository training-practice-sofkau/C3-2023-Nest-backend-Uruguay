import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';

import { TransferRepositoryInterface } from './interfaces/';
import { BaseRepository } from '.';
import { Transfer } from '../entities/transfer.entities';

@Injectable()
export class TransferRepository
    extends BaseRepository<Transfer>
    implements TransferRepositoryInterface {

//-----------------------------------------------------------------------------------------------------

register(entity: Transfer): Transfer {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
}

//-----------------------------------------------------------------------------------------------------

update(id: string, entity: Transfer): Transfer {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.trf_id === id && typeof item.trf_delete_at === 'undefined',
        );

    if (indexCurrentEntity <= 0){
        throw new NotFoundException(`Id : ${id} not found`);
    }
    
    this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
    } as Transfer;
    
    return entity;
}

//-----------------------------------------------------------------------------------------------------


delete(id: string, soft?: boolean): void {
    const indexdelete = this.database.findIndex(index => index.trf_id === id && typeof index.trf_delete_at === `undefined`);
    soft ? this.softDelete(indexdelete) : this.hardDelete(indexdelete);
}
 
private hardDelete(index: number): void {
 
    if (index < 0 )throw new NotAcceptableException(`No se aceptan valores negativos`);
    this.database.splice(index,1);
 }
 
private softDelete(index: number): void {
 
    if (index < 0) throw new NotAcceptableException(`No se aceptan valores negativos`);
    
    this.database[index].trf_delete_at = new Date; 
 }
//-----------------------------------------------------------------------------------------------------

findAll(): Transfer[] {
    return this.database.filter(
        (item) => typeof item.trf_delete_at === 'undefined',
    );
}

//-----------------------------------------------------------------------------------------------------

findOneById(id: string): Transfer {
    const currentEntity = this.database.find(
    (item) => item.trf_id === id && typeof item.trf_delete_at === 'undefined',
    );
    if(!currentEntity)throw new NotFoundException(`id : ${id} not found `);

    return currentEntity;
}

//-----------------------------------------------------------------------------------------------------

findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
): Transfer[] {
    const rango  = this.database.filter(item => item.trf_outcome === accountId && item.trf_date_time>=dateInit && item.trf_date_time === dateEnd && typeof  item.trf_delete_at === `undefined`);
    if(typeof rango === `undefined`)throw new NotFoundException();
    return rango;
}

//-----------------------------------------------------------------------------------------------------

findIncomeByDataRange(accountId: string,dateInit: Date | number,dateEnd: Date | number): Transfer[] {
    const rango  = this.database.filter(item => item.trf_income === accountId 
        && item.trf_date_time>=dateInit && 
        item.trf_date_time <= dateEnd &&
        typeof  item.trf_delete_at === `undefined`);
    if(typeof rango === `undefined`)throw new NotFoundException();
    return rango;
}



}
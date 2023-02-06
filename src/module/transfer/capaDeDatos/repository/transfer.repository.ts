import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entity/transfer.entities';
import { TransferRepositoryInterface } from './transfer-repository.interface';
import { BaseRepository } from '../../../base/repositories';
import { paginationDto } from '../../capaLogicaDeNegocio/dto';
import { PaginationModel } from 'src/module/base/models';

@Injectable()
export class TransferRepository
    extends BaseRepository<TransferEntity>
    implements TransferRepositoryInterface {

    register(entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.find(
            (item) => item.id === entity.id && typeof item.delete_at === 'undefined',
            );

        if (indexCurrentEntity)throw new NotFoundException(`Id : ${entity.id} not found`);

        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.delete_at === 'undefined',
            );

        if (indexCurrentEntity === -1){
            throw new NotFoundException(`Id : ${id} not found`);
        }
        
        this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as TransferEntity;

        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean): void {
        const indexdelete = this.database.findIndex(index => index.id === id && typeof index.delete_at === `undefined`);
        soft ? this.softDelete(indexdelete) : this.hardDelete(indexdelete);
    }
    
    private hardDelete(index: number): void {

        this.database.splice(index);
    }
    
    private softDelete(index: number): void {

        this.database[index].delete_at = Date.now(); 
    }

    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.delete_at === 'undefined',
        );
    }

    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.findIndex(
        (item) => item.id === id && typeof item.delete_at === 'undefined',
        );
        if(currentEntity === -1)throw new NotFoundException(`id : ${id} not found `);

        return this.database[currentEntity];
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
        pagination?: paginationDto
    ): TransferEntity[] {
        pagination = {
            ... {offset: 0, limit: 10},
            ... pagination
          }
        const rango  = this.database.filter(
            item => item.outcome.id === accountId 
            && item.date_time>=dateInit 
            && item.date_time === dateEnd 
            && typeof  item.delete_at === `undefined`).slice(pagination.offset, pagination.offset + (pagination.limit || 0));;
        if(typeof rango === `undefined`)throw new NotFoundException();
        return rango;
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
        pagination?: paginationDto):
        TransferEntity[] {
            pagination = {
                ... {offset: 0, limit: 10},
                ... pagination
              }
            const rango  = this.database.filter(
                item => item.income.id === accountId 
                && item.date_time>=dateInit 
                && item.date_time <= dateEnd 
                && typeof  item.delete_at === `undefined`).slice(pagination.offset, pagination.offset + (pagination.limit || 0));;
            if(typeof rango === `undefined`)throw new NotFoundException();
            return rango;
    }

}
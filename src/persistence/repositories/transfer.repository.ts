import { Injectable, NotFoundException } from '@nestjs/common';

import { TransferEntity } from '../entities';
import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces/';

@Injectable()
export class TransferRepository
    extends BaseRepository<TransferEntity>
    implements TransferRepositoryInterface {


    register(entity: TransferEntity): TransferEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if (indexCurrentEntity === -1) throw new NotFoundException();
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
          } as TransferEntity;
      }

    delete(id: string, soft?: boolean): void {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
        );
        if(indexCurrentEntity === -1) throw new NotFoundException();
        soft ?
        this.softDelete(indexCurrentEntity) :
        this.hardDelete(indexCurrentEntity);
    }

    private hardDelete(index: number): void {
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].deletedAt = Date.now();
    }

    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined',
        );
    }

    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
        );
        if (currentEntity) return currentEntity;
        throw new NotFoundException();
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const transfers = this.database.filter(
            (transfer) => transfer.outcome.id === accountId 
            && transfer.dateTime >= dateInit
            && transfer.dateTime <= dateEnd
            && typeof transfer.deletedAt === 'undefined');
        if (transfers) return transfers;
        throw new NotFoundException();
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const transfers = this.database.filter(
            (transfer) => transfer.income.id === accountId 
            && transfer.dateTime >= dateInit
            && transfer.dateTime <= dateEnd
            && typeof transfer.deletedAt === 'undefined');
        if (transfers) return transfers;
        throw new NotFoundException();
    }
}
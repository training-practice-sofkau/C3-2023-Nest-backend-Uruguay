import { Injectable, NotFoundException } from '@nestjs/common';

import { TransferEntity } from '../entities';
import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models';

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
            (item) => item.id === id && typeof item.daletedAt === 'undefined',
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
            } as TransferEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean): void {

        const index = this.database.findIndex(item => item.id === id);

        if(!index ) throw new NotFoundException();

        if (soft) {
            this.softDelete(index);
        } else {
            this.hardDelete(index);
        }
    }

    private hardDelete(index: number): void {
        this.database.splice(index, 1);
    }

    private softDelete(index: number): void {
        this.database[index].daletedAt = Date.now();
    }

    findAll(paginator: PaginationModel): TransferEntity[] {
        const { offset=0, limit=10 } = paginator;
        return this.database.filter(
            (itemAll) => typeof itemAll.daletedAt === 'undefined')
            .slice(offset, offset + limit);
    }

    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.find(
            (itemId) => itemId.id === id && typeof itemId.daletedAt === 'undefined',
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (itemORange) => itemORange.outcome.id === accountId && itemORange.dateTime >= dateInit && itemORange.dateTime <= dateEnd && typeof itemORange.daletedAt === 'undefined',
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (itemIRange) => itemIRange.income.id === accountId && itemIRange.dateTime >= dateInit && itemIRange.dateTime <= dateEnd && typeof itemIRange.daletedAt === 'undefined',
        );
        if(!currentEntity ) throw new NotFoundException();
        return currentEntity;
    }
}
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

        if(!index ) throw new NotFoundException;

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

    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.daletedAt === 'undefined',
        );
    }

    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.daletedAt === 'undefined',
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.outcome.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.daletedAt === 'undefined',
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.income.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.daletedAt === 'undefined',
        );
        if (currentEntity) return currentEntity;
        else throw new NotFoundException();
    }
}
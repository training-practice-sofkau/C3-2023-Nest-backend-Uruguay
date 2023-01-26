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
        throw new Error('This method is not implemented');
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.daletedAt === 'undefined',
        );
    }

    findOneById(id: string): TransferEntity {
        throw new Error('This method is not implemented');
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        throw new Error('This method is not implemented');
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        throw new Error('This method is not implemented');
    }
}
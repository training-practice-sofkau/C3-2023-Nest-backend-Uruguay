import { Injectable, NotFoundException } from '@nestjs/common';

import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';
import { PaginationModel } from '../../models';

@Injectable()
export class DepositRepository
    extends BaseRepository<DepositEntity>
    implements DepositRepositoryInterface {

    register(entity: DepositEntity): DepositEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: DepositEntity): DepositEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.daletedAt === 'undefined',
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
                ...this.database[indexCurrentEntity],
                ...entity,
                id,
            } as DepositEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean): void {

        const index = this.database.findIndex(item => item.id === id);

        if (!index) throw new NotFoundException();

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

    findAll(paginator: PaginationModel): DepositEntity[] {
        const { offset=0, limit=10 } = paginator;
        return this.database.filter(
            (item) => typeof item.daletedAt === 'undefined')
            .slice(offset, offset + limit);
    }

    findOneById(id: string): DepositEntity {
        const currentEntity = this.database.find(
            (itemId) => itemId.id === id && typeof itemId.daletedAt === 'undefined',
        );
        if (!currentEntity) throw new NotFoundException();
        return currentEntity;
    }

    findByAccountId(accountId: string): DepositEntity[] {
        const currentEntity = this.database.filter(
            (itemId) => itemId.accountId.id === accountId && typeof itemId.daletedAt === 'undefined',
        );
        if (!currentEntity) throw new NotFoundException();
        return currentEntity;
    }

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
    ): DepositEntity[] {
        const currentEntity = this.database.filter(
            (itemDate) => itemDate.dateTime >= dateInit && itemDate.dateTime <= dateEnd && typeof itemDate.daletedAt === 'undefined',
        );
        if (!currentEntity) throw new NotFoundException();
        return currentEntity;
    }
}
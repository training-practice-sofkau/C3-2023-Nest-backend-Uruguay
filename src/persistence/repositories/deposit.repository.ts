import { Injectable, NotFoundException } from '@nestjs/common';

import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';
import { DepositDto } from '../../dtos';

@Injectable()
export class DepositRepository
    extends BaseRepository<DepositEntity>
    implements DepositRepositoryInterface {

    register(entity: DepositEntity): DepositEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: DepositDto): DepositEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if (indexCurrentEntity === -1) throw new NotFoundException();
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
          } as DepositEntity;
      }

    delete(id: string, soft?: boolean): void {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
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

    findAll(): DepositEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined');
    }

    findOneById(id: string): DepositEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.deletedAt === 'undefined');
        if (currentEntity) return currentEntity;
        throw new NotFoundException();
    }

    findByAccountId(accountId: string): DepositEntity[] {
        const currentEntities = this.database.filter(
            (item) => item.id === accountId && typeof item.deletedAt === 'undefined');
        if (currentEntities) return currentEntities;
        throw new NotFoundException();
    }

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
    ): DepositEntity[] {
        const deposits = this.database.filter(
            (deposit) => deposit.dateTime <= dateInit
            && deposit.dateTime >= dateEnd
            && typeof deposit.deletedAt === 'undefined');
        if (deposits) return deposits;
        throw new NotFoundException();
    }
}
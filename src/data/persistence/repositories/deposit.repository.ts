import { Injectable, NotFoundException } from '@nestjs/common';

import { DepositEntity } from '../entities';
import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';
import { DepositDto } from '../../../business/dtos';

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
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if (indexCurrentEntity === -1) throw new NotFoundException();
        return this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
          } as DepositEntity;
      }

    delete(id: string, soft?: boolean): string {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined'
        );
        if(indexCurrentEntity === -1) throw new NotFoundException();
        
        if(soft) {
            return this.softDelete(indexCurrentEntity);
        }
        return this.hardDelete(indexCurrentEntity);
    }

    private hardDelete(index: number): string {
        try {
            this.database.splice(index, 1);
        } catch (error) {
            return 'The deposit could not be deleted';
        }
        return 'The deposit was successfully deleted';
    }

    private softDelete(index: number): string {
        this.database[index].deletedAt = new Date();

        if(this.database[index].deletedAt) return 'The deposit was successfully soft deleted'
        return 'The deposit could not be soft deleted';
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
        
        if(typeof dateInit === 'number') dateInit = new Date(dateInit);
        if(typeof dateEnd === 'number') dateEnd = new Date(dateEnd);

        const deposits = this.database.filter(
            (deposit) => deposit.dateTime <= dateInit
            && deposit.dateTime >= dateEnd
            && typeof deposit.deletedAt === 'undefined');
        if (deposits) return deposits;
        throw new NotFoundException();
    }
}
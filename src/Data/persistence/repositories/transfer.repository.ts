import { Injectable, NotFoundException } from '@nestjs/common';
import { TransferEntity } from '../entities';

import { BaseRepository } from './base';
import { TransferRepositoryInterface } from './interfaces/';

@Injectable()
export class TransferRepository
  extends BaseRepository<TransferEntity>
  implements TransferRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof TransferEntity,
    dataToSearch: string,
  ): TransferEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The data is not in our database');
  }
  searchByAttributes(
    attributes: keyof TransferEntity,
    dataToSearch: string,
  ): TransferEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The data is not in our database');
  }
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: TransferEntity): TransferEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as TransferEntity;
    else throw new NotFoundException('The id does not exist in the database.');
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    const index = this.database.findIndex((item) => item.id === id);

    if (soft === true) {
      this.hardDelete(index);
    } else {
      this.softDelete(index);
    }
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].state = false;
    this.database[index].deletedAt = Date.now();
  }

  findAll(): TransferEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): TransferEntity[] {
    let currentEntity = this.database.filter(
      (item) =>
        item.dateTime >= dateInit &&
        item.dateTime <= dateEnd &&
        item.id === accountId,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The id does not exist in the database.');
  }

  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
    
  ): TransferEntity[] {
    let currentEntity = this.database.filter(
      (item) =>
        item.dateTime <= dateInit &&
        item.dateTime >= dateEnd &&
        item.id === accountId,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('The id does not exist in the database.');
  }

  findOneById(id: string): TransferEntity[] {
    const transfer = this.database.filter(
      (item) => item.id === id,
    );
    if (transfer) return transfer;
    else throw new NotFoundException('The id does not exist in the database.');
  }
}

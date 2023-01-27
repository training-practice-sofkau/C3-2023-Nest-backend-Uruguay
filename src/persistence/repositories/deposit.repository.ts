import { DepositEntity } from '../entities/';
import { BASE } from './base/';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DespositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
  extends BASE<DepositEntity>
  implements DespositRepositoryInterface
{
  register(entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1) throw new Error('The Desposit already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as DepositEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.findIndex(id);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft ? this.softDelete(indexCurrentEntity) : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(): DepositEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findOneById(id: string): DepositEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByAccountId(accountId: string): DepositEntity[] {
    const currentEntity = this.database.filter(
      (item) => item.account.id === accountId && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {
    return this.database.filter(
      (item) => item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    );
  }

  findByAccountIdAndDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[]  {
    return this.database.filter(
      (item) => item.account.id === accountId && item.dateTime >= dateInit && item.dateTime <= dateEnd && typeof item.deletedAt === 'undefined',
    );
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
  }
}

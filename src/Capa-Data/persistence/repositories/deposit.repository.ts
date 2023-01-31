import { Injectable, NotFoundException } from '@nestjs/common';
import { depositEntity } from '../entities/deposit.entity';

import { BaseRepository } from './base';
import { DepositRepositoryInterface } from './interfaces/';

@Injectable()
export class DepositRepository
  extends BaseRepository<depositEntity>
  implements DepositRepositoryInterface
{
  register(entity: depositEntity): depositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: depositEntity): depositEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as depositEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    if (soft === undefined) {
      const index = this.database.findIndex((item) => item.id === id);
      this.softDelete(index);
    } else {
      const index = this.database.findIndex((item) => item.id === id);
      this.hardDelete(index); // le paso el index para que llame a la funcion
    }
  }
  findAll(): depositEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }

  findOneById(id: string): depositEntity {
    const deposit = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true,
    );
    if (deposit) return deposit;
    else throw new NotFoundException('El id no existe en base de datos');
  }

  findByAccountType(accountTypeId: string): depositEntity[] {
    const accountf = this.database.filter(
      //filtra segun una condicion y devuelve un array
      (item) =>
        item.account.id == accountTypeId &&
        typeof item.deletedAt === 'undefined',
    );
    return accountf;
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }
  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }
}

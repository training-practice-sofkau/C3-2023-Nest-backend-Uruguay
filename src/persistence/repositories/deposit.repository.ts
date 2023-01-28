import { Injectable, NotFoundException } from '@nestjs/common';
import { Base } from './base/base.abstract';
import { DepositEntity } from '../entities/deposit.entity';
import { CRUD } from './interfaces/crud.interface';


@Injectable()
export class DepositRepository extends Base<DepositEntity> implements CRUD<DepositEntity>{

  register(entity: DepositEntity): DepositEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DepositEntity): DepositEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deleted_at === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DepositEntity;
    else throw new DepositEntity();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].deleted_at = Date.now()
  }

  findAll(): DepositEntity[] {
    if (this.database.length == 0) {
      throw new Error('No se encontraron elementos');
    }
    return this.database.filter(
      (item) => typeof item.deleted_at === 'undefined',
    );
  }

  findOneById(id: string): DepositEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('No se encontro el id');
  }

  findByAccountId(accountId: string): DepositEntity[] {
    const currentEntity: DepositEntity[] = this.database.filter(
      (item) => item.account_id.id === accountId && typeof item.deleted_at === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('No se encontro el telefono');
  }

  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[] {

    const currentEntity1: DepositEntity[] = this.database.filter(
      (item) => item.date_time >= dateInit && item.date_time <= dateEnd && typeof item.deleted_at === 'undefined',
    )
      if (currentEntity1) return currentEntity1;
      else throw new Error('Datos de no encontrados');
        
  }


}
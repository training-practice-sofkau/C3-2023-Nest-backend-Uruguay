import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';
import { TransferEntity } from '../entities/transfer.entity';

@Injectable()
export class TranferRepository  extends Base<TransferEntity> implements CRUD<TransferEntity>{
  
  register(entity: TransferEntity): TransferEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
}

update(id: string, entity: TransferEntity): TransferEntity {
  const indexCurrentEntity = this.database.findIndex(
    (item) => item.id === id && typeof item.deleted_at === 'undefined',
  );
  if (indexCurrentEntity >= 0)
    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as TransferEntity;
  else throw new TransferEntity();
  return this.database[indexCurrentEntity];
}

delete(id: string, soft?: boolean): void {
  const index = this.database.findIndex(
    (item) => item.id === id
  );
  if (index == -1){
  throw new Error('No se encontraron elementos');
  }
if (soft){
  this.hardDelete(index)
}else{
  this.softDelete(index)
}

}

private hardDelete(index: number): void {
  this.database.splice(index, 1);
}

private softDelete(index: number): void {
    throw new Error('This method is not implemented');
}

findAll(): TransferEntity[] {
  if (this.database.length == 0) {
    throw new Error('No se encontraron elementos');
  }
  return this.database.filter(
    (item) => typeof item.deleted_at === 'undefined',
  );
}

findOneById(id: string): TransferEntity {
  const currentEntity = this.database.find(
    (item) => item.id === id && typeof item.deleted_at === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException("Elemento no encontrado");
}

findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
): TransferEntity[] {
  const currentEntity1: TransferEntity[] = this.database.filter(
    (item) => item.date_time >= dateInit && item.date_time <= dateEnd && item.outcome_id.id === accountId && typeof item.deleted_at === 'undefined',
  )
    if (currentEntity1) return currentEntity1;
    else throw new Error('Datos de no encontrados');
}

findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
): TransferEntity[] {

  const currentEntity1: TransferEntity[] = this.database.filter(
    (item) => item.date_time >= dateInit && item.date_time <= dateEnd && item.income_id.id === accountId && typeof item.deleted_at === 'undefined',
  )
    if (currentEntity1) return currentEntity1;
    else throw new Error('Datos de no encontrados');
}

  
  
}
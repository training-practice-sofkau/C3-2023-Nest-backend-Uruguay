import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { AccountTypeModel } from '../account.entities';
import { AccountTypeRepositoryInterface } from '../account-type-repository.interface';



@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeModel>
    implements AccountTypeRepositoryInterface {

register(entity: AccountTypeModel):AccountTypeModel  {
    this.database.push(entity);
    return entity;
}

update(id: string, entity: AccountTypeModel) {
  const indexCurrentEntity = this.database.findIndex(
      (item) => item.acctp_id === id );

  if (indexCurrentEntity <= 0){
      throw new NotFoundException(`Id : ${id} no found`)
  }

  this.database[indexCurrentEntity] = {
    ...this.database[indexCurrentEntity],
    ...entity,
    id,
  } as AccountTypeModel;
}

delete(id: string, soft?: boolean | undefined): void {
  const indexdelete = this.database.findIndex(index => index.acctp_id === id && typeof index.acctp_deletd_at === `undefined`);
  soft ? this.softDelete(indexdelete) : this.hardDelete(indexdelete);
}

private hardDelete(index: number): void {
   
  if (index < 0 ){
      throw new NotAcceptableException(`No se aceptan valores negativos`);
    }
    this.database.splice(index,1);
  
}

private softDelete(index: number): void {
  if (index < 0){
      throw new NotAcceptableException(`No se aceptan valores negativos`);
  }
  this.database[index].acctp_deletd_at = new Date; 
}

findAll(): AccountTypeModel[] {
    return this.database.filter(
    (item) => typeof item.acctp_state === 'undefined');
}

findOneById(id: string){
    let currentEntity = this.database.find(
        (Entity) => Entity.acctp_id === id);
    if (!currentEntity){       
      throw new NotFoundException(`id :${id} no found`);
    }
    return currentEntity;
}

//Cree una funcion nueva para encontrar los tipos de cuentas
findOneByIdCuentas(id: string):AccountTypeModel{
  let currentEntity = this.database.find(
      (Entity) => Entity.customer_id.find((TypeAccount) => TypeAccount.acctp_id === id);
  if (!currentEntity){       
    throw new NotFoundException(`id :${id} no found`);
  }
  return currentEntity;
}




findByState(state: boolean): AccountTypeModel[] {
  /*
    Se puede hacer con un filter que es una funcion que filtra ciertas
    condiciones y te devuelve un array de aquellos objeto que pasen correctamente
   */
  let curr =this.database.filter( (entity) => entity.acctp_state === state
   && typeof entity.acctp_deletd_at === `undefined`);
  if(!curr){
    throw new NotFoundException(`State : ${state} not found`);
  }
  return curr;
}

findByName(name: string): AccountTypeModel[] {
  const curr =this.database.filter( (entity) => entity.acctp_name === name
  && typeof entity.acctp_deletd_at === `undefined`);
 if(!curr){
   throw new NotFoundException(`Name : ${name} not found`);
 }

  return curr;
}
}
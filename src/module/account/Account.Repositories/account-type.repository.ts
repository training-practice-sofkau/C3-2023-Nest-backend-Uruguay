import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { BaseRepository } from '../../base/base.repository';
import { AccountTypeEntity } from '../account.Type.Entity';
import { AccountTypeModel } from '../account-type-model.interface';
import { AccountTypeRepositoryInterface } from '.';



@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {

register(entity: AccountTypeModel):AccountTypeEntity  {
    this.database.push(entity);
    return entity;
}

update(id: string, entity: AccountTypeModel):AccountTypeEntity {
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

  return this.database[indexCurrentEntity];
}

delete(id: string): void {
  const indexCurrentEntity = this.database.findIndex((item) => item.id === id);

    if (!indexCurrentEntity) throw new NotFoundException();

    this.database.splice(indexCurrentEntity); 
}


findAll(): AccountTypeEntity[] {
    return this.database.filter(
    (item) => typeof item.state === 'undefined');
}

findOneById(id: string):AccountTypeEntity{
    let currentEntity = this.database.find(
        (Entity) => Entity.id === id);
    if (!currentEntity){       
      throw new NotFoundException(`id :${id} no found`);
    }
    return currentEntity;
}

//Cree una funcion nueva para encontrar los tipos de cuentas
findOneByIdCuentas(id: string):AccountTypeEntity{
  let currentEntity = this.database.find(entity => entity.id === id);
  if (!currentEntity){       
    throw new NotFoundException(`id :${id} no found`);
  }
  return currentEntity;
}




findByState(state: boolean): AccountTypeEntity[] {
  let curr =this.database.filter( (entity) => entity.state === state);
  if(!curr){
    throw new NotFoundException(`State : ${state} not found`);
  }
  return curr;
}

findByName(name: string): AccountTypeEntity[] {
 const curr =this.database.filter( (entity) => entity.name === name);
 if(!curr){
   throw new NotFoundException(`Name : ${name} not found`);
 }
  return curr;
}
}
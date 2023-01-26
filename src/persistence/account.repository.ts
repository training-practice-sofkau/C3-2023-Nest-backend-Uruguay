import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from './repositories/base/base.repository';
import { AccountTypeModel } from './entities/account.type.entities';
import { AccountTypeRepositoryInterface } from './repositories/interfaces/account-type-repository.interface';



@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeModel>
    implements AccountTypeRepositoryInterface {

register(entity: AccountTypeModel) {
    this.database.push(entity);
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
    throw new Error('Method not implemented.');
}

findAll(): AccountTypeModel[] {
    return this.database.filter(
    (item) => typeof item.acctp_state === 'undefined');
}

findOneById(id: string) {
    const currentEntity = this.database.find(
        (item) => item.acctp_id === id);
    if (currentEntity){       
      throw new NotFoundException(`id :${id} no found`);
    }
    return currentEntity;
}

findByState(state: boolean): AccountTypeModel[] {
    //Verifico que alguna cuenta este en se estado
  const indexCurrentEntity = this.database.find( (item) => item.acctp_state === state);
  //Si no hay una cuenta con este estado entonces mando un exepcion
  if(!indexCurrentEntity){
    throw new NotFoundException(`State : ${state} not found`);
  }

  //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
  const stateAccounttypeModel : AccountTypeModel[] = [];
  for(let i = 0; i<this.database.length; i++){
    if(this.database[i].acctp_state === state){
        stateAccounttypeModel[i] = this.database[i];
    }
  }
  
  return stateAccounttypeModel;
}

findByName(name: string): AccountTypeModel[] {
  //Verifico que alguna cuenta este en se estado
  const indexCurrentEntity = this.database.find( (item) => item.acctp_name === name);
  //Si no hay una cuenta con este estado entonces mando un exepcion
  if(!indexCurrentEntity){
  throw new NotFoundException(`name : ${name} not found`);
}

//En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
const nameAccounttypeModel : AccountTypeModel[] = [];
  for(let i = 0; i<this.database.length; i++){
    if(this.database[i].acctp_name === name){
      nameAccounttypeModel[i] = this.database[i];
    }
  }

  return nameAccounttypeModel;
}
}
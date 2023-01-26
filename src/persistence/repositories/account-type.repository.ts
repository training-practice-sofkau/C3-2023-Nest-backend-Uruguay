import { Injectable, NotFoundException } from '@nestjs/common';

import { BaseRepository } from './';
import { AccountTypeRepositoryInterface } from './interfaces';
import { Account } from '../entities/account.entities';
import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';


@Injectable()
export class AccountTypeRepository
    extends BaseRepository<Account>
    implements AccountTypeRepositoryInterface {

register(entity: Account): void {
    this.database.push(entity);
}

update(id: string, entity: Account):Account{
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.acc_id === id && typeof item.acc_delete_at === 'undefined',
      );

      if(indexCurrentEntity <= 0){
        throw new NotFoundException(`Id : ${id} no found .`)
      }
        this.database[indexCurrentEntity] = {
          ...this.database[indexCurrentEntity],
          ...entity,
          id,
        } as Account;
      return this.database[indexCurrentEntity];
}

findAll(): Account[] {
    return this.database.filter(
        (item) => typeof item.acc_delete_at === 'undefined',
      );
}

findOneById(id: string):Account {
    const currentEntity = this.database.find(
        (item) => item.acc_id === id && typeof item.acc_delete_at === 'undefined',
      );

      if(!currentEntity){
        throw new NotFoundException(`Id : ${id} no found`);
      }
      return currentEntity;
      
}

findByState(state: boolean): Account[] {
    //Verifico que algun cliente este en se estado
const indexCurrentEntity = this.database.find(
    (item) =>
      item.acc_state === state &&
      typeof item.acc_delete_at === 'undefined',
  );
  //Si no hay cliente con este estado entonces mando un exepcion
  if(!indexCurrentEntity){
    throw new NotFoundException(`State : ${state} not found`);
  }

  //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
  const stateAccount : Account[] = [];
  for(let i = 0; i<this.database.length; i++){
    if(this.database[i].acc_state === state){
        stateAccount[i] = this.database[i];
    }
  }
  
  return stateAccount;
}

findByCustomer(customerId: string): Account[] {
    //Verifico que algun cliente este en se estado
    const indexCurrentEntity = this.database.find(
    (item) =>
      item.coustomer_id === customerId &&
      typeof item.acc_delete_at === 'undefined',
    );
    //Si no hay cliente con este estado entonces mando un exepcion
    if(!indexCurrentEntity){
        throw new NotFoundException(`customer Id : ${customerId} not found`);
    }

    //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
    const CustomerAccount : Account[] = [];
    for(let i = 0; i<this.database.length; i++){
        if(this.database[i].coustomer_id === customerId){
            CustomerAccount[i] = this.database[i];
        }
    }

    return CustomerAccount;
}

findByAccountType(accountTypeId: string): Account[] {
//Verifico que algun cliente este en se estado
  const indexCurrentEntity = this.database.find(
    (item) =>
      item.account_type_id === accountTypeId &&
      typeof item.acc_delete_at === 'undefined',
    );
    //Si no hay cliente con este estado entonces mando un exepcion
    if(!indexCurrentEntity){
        throw new NotFoundException(`account Type Id: ${accountTypeId} not found`);
    }

    //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
    const CopyAccountTypeId : Account[] = [];
    for(let i = 0; i<this.database.length; i++){
        if(this.database[i].account_type_id === accountTypeId){
            CopyAccountTypeId[i] = this.database[i];
        }
    }

    return CopyAccountTypeId;
}

delete(id: string, soft?: boolean | undefined): void {
  throw new Error('Method not implemented.');
}

private hardDelete(index: number): void {
//Lo borro directo del arreglo
  if (index < 0 ){
    throw new NotAcceptableException(`No se aceptan valores negativos`);
  }
  this.database.splice(index,1);
}

private softDelete(index: number): void {
//Lo borro asignandole a delete_at un Date
  
}

}
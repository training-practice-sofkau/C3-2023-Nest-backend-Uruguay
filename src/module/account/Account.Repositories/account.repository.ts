import { Injectable, NotFoundException } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';
import { AccountEntity } from '../account.entities';
import { AccountModel } from 'src/module/account/accountModel.interface';
import { AccountRepositoryInterface } from './account-repository.interface';
import { BaseRepository } from 'src/module/base/base.repository';


@Injectable()
export class AccountRepository
    extends BaseRepository<AccountEntity>
    implements AccountRepositoryInterface {

register(entity: AccountModel ): AccountEntity {
    this.database.push(entity);
    return  this.database.at(-1) ?? entity;
}

update(id: string, entity: AccountModel):AccountEntity{
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id === id && typeof item.delete_at === 'undefined',
      );

      if(indexCurrentEntity <= 0){
        throw new NotFoundException(`Id : ${id} no found .`)
      }
        this.database[indexCurrentEntity] = {
          ...this.database[indexCurrentEntity],
          ...entity,
          id,
        } as AccountEntity;
      return this.database[indexCurrentEntity];
}

findAll(): AccountEntity[] {
    return this.database.filter(
        (item) => typeof item.delete_at === 'undefined',
      );
}

findOneById(id: string):AccountEntity {
    const currentEntity = this.database.find(
        (item) => item.acc_id === id && typeof item.acc_delete_at === 'undefined',
      );

      if(!currentEntity){
        throw new NotFoundException(`Id : ${id} no found`);
      }
      return currentEntity;
      
}

findByState(state: boolean): AccountEntity[] {
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

findByCustomer(customerId: string): AccountEntity[] {
    //Verifico que algun cliente este en se estado
    const indexCurrentEntity = this.database.find(
    (item) =>
      item.coustomer_id.cust_id === customerId &&
      typeof item.delete_at === 'undefined',
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

findByAccountType(accountTypeId: string): AccountEntity[] {
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
  const indexdelete = this.database.findIndex(index => index.id === id && typeof index.acc_delete_at === `undefined`);
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
  this.database[index].delete_at = new Date;
}

}
import { TypeDTO } from '../../../business/dtos/type.dto';
import { AccountTypeEntity } from '../../persistence/entities/account-type.entity';
import { NotFoundException } from '@nestjs/common';

export interface AccountTypeFactoryI {
  create(accountTypeDTO: TypeDTO): AccountTypeEntity;
}

export class SavingAccount implements AccountTypeFactoryI {
  private static instance: AccountTypeEntity;

  constructor() {}

  create(accountTypeDTO: TypeDTO): AccountTypeEntity {
    SavingAccount.instance = new AccountTypeEntity();
    SavingAccount.instance.name = 'Saving Account';
    return SavingAccount.instance;
  }

  getInstance(accountTypeDTO: TypeDTO): AccountTypeEntity {
    if (!SavingAccount.instance) {
      SavingAccount.instance = this.create(accountTypeDTO);
    }

    return SavingAccount.instance;
  }
}

export class CheckingAccount implements AccountTypeFactoryI {
  private static instance: AccountTypeEntity;

  constructor() {}

  create(accountTypeDTO: TypeDTO): AccountTypeEntity {
    CheckingAccount.instance = new AccountTypeEntity();
    CheckingAccount.instance.name = 'Checking Account';
    return CheckingAccount.instance;
  }

  getInstance(accountTypeDTO: TypeDTO): AccountTypeEntity {
    if (!CheckingAccount.instance) {
      CheckingAccount.instance = this.create(accountTypeDTO);
    }

    return CheckingAccount.instance;
  }
}

export class AccountTypeFactory {

  createAccountType(accountType: TypeDTO): AccountTypeEntity {

    if (accountType.name === 'Saving Account') {
        const account = new SavingAccount();
        return account.getInstance(accountType);
    } else if (accountType.name === 'Checking Account') {
        const account = new CheckingAccount();
        return account.getInstance(accountType);
    } else {
        throw new NotFoundException();
    }

  }
}

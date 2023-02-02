import { AccountTypeEntity } from '../../persistence/entities/account-type.entity';
import { AccountTypeFactory } from '../../FactoryPattern/AccountType/account-type-factory';

export interface AccountTypeStrategy {
    assignAccountType(): AccountTypeEntity;
}

export class SavingAccountStrategy implements AccountTypeStrategy {

    assignAccountType(): AccountTypeEntity {
        const accountTypeFactory = new AccountTypeFactory();
        return accountTypeFactory.createAccountType({name: 'Saving Account'});
    }

}

export class CheckingAccountStrategy implements AccountTypeStrategy {

    assignAccountType(): AccountTypeEntity {
        const accountTypeFactory = new AccountTypeFactory();
        return accountTypeFactory.createAccountType({name: 'Checking Account'});
    }

}

export class AccountTypeContext {
    private strategy: AccountTypeStrategy;

    constructor(strategy: AccountTypeStrategy) {
        this.strategy = strategy;
    }

    assignAccountTypeStrategy(): AccountTypeEntity {
        return this.strategy.assignAccountType();
    }
}
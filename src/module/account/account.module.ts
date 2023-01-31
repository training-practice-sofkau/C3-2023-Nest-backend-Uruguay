import { Module } from '@nestjs/common';
import { AccountService } from './capaLogicaDeNegocio/service';
import { AccountController } from './capaPresentacion/controller/account.controller';
import { AccountRepository, AccountTypeRepository } from './capaDeDato/repositories';
import { CustomerRepository, CustomerService } from '../customer';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [AccountService,AccountRepository,AccountTypeRepository,CustomerService,CustomerRepository]

})
export class AccountModule {}


import { Module } from '@nestjs/common';
import { DepositService } from './capaLogicaDeNegocio/service/deposit.service';
import { AccountService } from '../account/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from '../account/capaDeDato/repositories';
import { CustomerRepository, CustomerService } from '../customer';
import { DepositRepository } from './capaDeDato/repository';
import { DepositController } from './capaPresentacion/controller';

@Module({
    imports: [],
    controllers: [DepositController],
    providers: [DepositService,DepositRepository,AccountService,AccountRepository,AccountTypeRepository,CustomerService,CustomerRepository]
})
export class DepositModule {}

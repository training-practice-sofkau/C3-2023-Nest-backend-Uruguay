import { Module } from '@nestjs/common';
import { CustomerService } from './capaLogicaDeNegocio/service/customer.service';

import { CustomerController } from './capaPresentacion/controller/customer.controller';
import { CustomerRepository, DocumentTypeRepository } from './capaDeDato/repository';
import { AccountService } from '../account/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from '../account/capaDeDato/repositories';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService,CustomerRepository,DocumentTypeRepository,AccountService,AccountRepository,AccountTypeRepository]
})
export class CusotmerModule {}

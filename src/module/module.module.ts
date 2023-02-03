import { Module } from '@nestjs/common';
import { AccountService } from './account/capaLogicaDeNegocio/service';
import { AccountController } from './account/capaPresentacion/controller';
import { CustomerController } from './customer/capaPresentacion/controller';
import { DepositController } from './deposit/capaPresentacion/controller';
import { TransferService } from './transfer/capaLogicaDeNegocio/service';
import { SegurityController } from './Modules.Persistencia/capaPresentacion/controller';
import { DepositService } from './deposit/capaLogicaDeNegocio/service';
import { SegurityService } from './Modules.Persistencia/capaLogicaDeNegocio/service';
import { CustomerService } from './customer/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from './account/capaDeDato/repositories';
import { CustomerRepository, DocumentTypeRepository } from './customer/capaDeDato/repository';
import { DepositRepository } from './deposit/capaDeDato/repository';
import { TransferRepository } from './transfer/capaDeDatos/repository';
import { TransferController } from './transfer/capaPresentacion/controller';


@Module({
    imports: [],
    controllers: [AccountController,CustomerController,DepositController,TransferController,SegurityController],
    providers: [AccountTypeRepository,AccountRepository,AccountService,CustomerService,DepositService,TransferService,SegurityService,CustomerRepository,DocumentTypeRepository,DepositRepository,TransferRepository]
})
export class ModuleModule {}

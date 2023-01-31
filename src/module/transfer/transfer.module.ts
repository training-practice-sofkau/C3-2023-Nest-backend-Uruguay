import { Module } from '@nestjs/common';
import { TransferService } from './capaLogicaDeNegocio/service/transfer.service';
import { TransferController } from './capaPresentacion/controller/transfer.controller';
import { TransferRepository } from './capaDeDatos/repository/transfer.repository';
import { AccountService } from '../account/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from '../account/capaDeDato/repositories';
import { CustomerRepository, CustomerService } from '../customer';

@Module({
    imports: [],
    controllers: [TransferController],
    providers: [TransferService,TransferRepository,AccountService,AccountRepository,AccountTypeRepository,CustomerService,CustomerRepository]
})
export class TransferModule {}

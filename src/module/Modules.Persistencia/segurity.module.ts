import { Module } from '@nestjs/common';
import { SegurityService } from './capaLogicaDeNegocio/service/segurity.service';
import { SegurityController } from './capaPresentacion/controller/segurity.controller';
import { CustomerRepository, CustomerService } from '../customer';
import { AccountService } from '../account/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from '../account/capaDeDato/repositories';

@Module({
  imports: [],
  controllers: [SegurityController],
  providers: [SegurityService,CustomerRepository,AccountService,AccountRepository,AccountTypeRepository,CustomerService]
})
export class SegurityModule {}

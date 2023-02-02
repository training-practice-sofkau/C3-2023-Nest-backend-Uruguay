import { Module } from '@nestjs/common';
import { SegurityService } from './capaLogicaDeNegocio/service/segurity.service';
import { SegurityController } from './capaPresentacion/controller/segurity.controller';
import { CustomerRepository, CustomerService, DocumentTypeRepository } from '../customer';
import { AccountService } from '../account/capaLogicaDeNegocio/service';
import { AccountRepository, AccountTypeRepository } from '../account/capaDeDato/repositories';

@Module({
  imports: [],
  controllers: [],
  providers: []
})
export class SegurityModule {}

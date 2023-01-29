import { Module } from '@nestjs/common';

import { SecurityController, 
         AccountController } from './controllers';

import { AccountService, 
         CustomerService, 
         DepositService, 
         TransferService, 
         SecurityService
         } from './services';

import { AccountRepository, 
         CustomerRepository, 
         DepositRepository, 
         TransferRepository, 
         AccountTypeRepository, 
         DocumentTypeRepository } from './persistence/repositories';

@Module({
  imports: [],
  controllers: [SecurityController, AccountController],
  providers: [AccountService, 
              CustomerService, 
              DepositService, 
              SecurityService, 
              TransferService, 

              AccountRepository, 
              CustomerRepository,
              DepositRepository, 
              TransferRepository, 
              AccountTypeRepository,
              DocumentTypeRepository],
})
export class AppModule { }

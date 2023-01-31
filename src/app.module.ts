import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {  
         AccountController,
         CustomerController, 
         DepositController,
         SecurityController,
         TransferController,
         } from './presentation/controllers';

import { AccountService, 
         CustomerService, 
         DepositService, 
         TransferService, 
         SecurityService, } from './business/services';

import { AccountRepository, 
         CustomerRepository, 
         DepositRepository, 
         TransferRepository, 
         AccountTypeRepository, 
         DocumentTypeRepository, } from './data/persistence/repositories';


@Module({  
  imports: [ConfigModule.forRoot()],
  controllers: [AccountController, CustomerController, DepositController, TransferController, SecurityController, ],
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

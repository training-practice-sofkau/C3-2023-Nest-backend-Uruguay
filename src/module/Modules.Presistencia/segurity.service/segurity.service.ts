// Libraries
import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common';
  

import jwt  from 'jsonwebtoken';
import { Response } from 'express';

// Data transfer objects


// Models
import { CustomerModel, CustomerRepository } from 'src/module/cusotmer';

// Repositories


// Services



// Entities
import { CustomerEntity } from 'src/module/cusotmer/customer.entity';
import { AccountTypeEntity } from 'src/module/account/account.Type.Entity';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from '../../account/account.entities';
import { AccountService } from 'src/module/account/service';
import { Res } from '@nestjs/common/decorators';
import * as request from 'supertest';


@Injectable()
export class SegurityService {
  constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
    ) {}
      
  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: CustomerModel): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (!answer)  throw new UnauthorizedException();
    
    return jwt.sign({id: user.id},process.env.TOKEN_SECRET || `tokentest`);
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: CustomerModel): string {
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = user.documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;
    
    const customer = this.customerRepository.register(newCustomer);

    if (!customer) throw new InternalServerErrorException();
    
    const accountType = new AccountTypeEntity();
    accountType.id = uuid();//Se lo asignamos nosotros?
    let newAccount = new AccountEntity();
    newAccount = {
      ...newAccount,
      customer,
      accountType,
    };

    const account = this.accountService.createAccount(newAccount);

    if (!account) throw new InternalServerErrorException();
    
    
    return jwt.sign({_id: account.id},process.env.TOKEN_SECRET || ` tokentest`) ;  
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string , res:Response): void {
    res.clearCookie(JWToken);
  }
}

import {
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    UnauthorizedException,
  } from '@nestjs/common';
  

import * as jwt from 'jsonwebtoken';

import { CustomerEntity } from 'src/module/customer/capaDeDato/entity/customer.entity';
import { AccountService } from 'src/module/account/capaLogicaDeNegocio/service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { CreateAccountdto } from '../../../account/capaLogicaDeNegocio/dto/create-account.dto';
import { AccountTypeRepository } from 'src/module/account/capaDeDato/repositories';
import { CustomerService } from '../../../customer/capaLogicaDeNegocio/service/customer.service';
import { CustomerRepository, DocumentTypeRepository } from 'src/module/customer/capaDeDato/repository';
import { DocumentTypeEntity } from 'src/module/customer/capaDeDato/entity';



@Injectable()
export class SegurityService {

  constructor(
    private readonly documentTypeRepository : DocumentTypeRepository,
    private readonly customerRepository : CustomerRepository,
    private readonly accountypeRepository : AccountTypeRepository,
    private readonly accountService : AccountService){}


      

  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password
    );
    if (!answer)  throw new UnauthorizedException(`No found user : ${user.username} and ${user.password}`);
    
    return jwt.sign(user,process.env.TOKEN || `tokenEntrada`);
  }

  signUp(user: SignUpDto): string {

    const documentType = this.documentTypeRepository.findOneById(user.documentTypeId);
    documentType.id = user.documentTypeId;

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountTypeData = this.accountypeRepository.findOneById(user.accountTypeId);
      if(typeof accountTypeData === 'undefined') throw new NotAcceptableException(`No hay accountType existente`);

      const newAccount = new CreateAccountdto();
      newAccount.customer = customer.id;
      newAccount.accountTypeId = accountTypeData.id;

      const account = this.accountService.createAccount(newAccount);

      if (!account) throw new InternalServerErrorException();
      return jwt.sign(user,process.env.TOKEN || 'tokenRegistro');

    }else throw new InternalServerErrorException(`Error al registrase`);
  }

  signOut(JWToken: string): void {
    if(!jwt.verify(
      JWToken, process.env.TOKEN || 'tokenRegistro')
      ) throw new Error('JWT No Valido');
  }
}

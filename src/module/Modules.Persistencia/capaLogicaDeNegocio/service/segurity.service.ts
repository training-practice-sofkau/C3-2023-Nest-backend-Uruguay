import {
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    UnauthorizedException,
  } from '@nestjs/common';
  
import jwt  from 'jsonwebtoken';


import { CustomerEntity } from 'src/module/customer/capaDeDato/entity/customer.entity';
import { AccountService } from 'src/module/account/capaLogicaDeNegocio/service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { CustomerRepository, DocumentTypeRepository } from '../../../customer';
import { CreateAccountdto } from '../../../account/capaLogicaDeNegocio/dto/create-account.dto';
import { AccountTypeRepository } from 'src/module/account/capaDeDato/repositories';
import { CustomerService } from '../../../customer/capaLogicaDeNegocio/service/customer.service';



@Injectable()
export class SegurityService {

  constructor(
    private readonly documentTypeRepository : DocumentTypeRepository,
    private readonly customerRepository : CustomerRepository,
    private readonly CustomerService : CustomerService,
    private readonly accountypeRepository : AccountTypeRepository,
    private readonly accountService : AccountService){}


      

  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password
    );
    if (!answer)  throw new UnauthorizedException(`No found user : ${user.username} and ${user.password}`);
    
    //return jwt.sign({id: user.username},process.env.TOKEN_SECRET || `tokentest`);
    return "token entrada";
  }

  signUp(user: SignUpDto): string {

    const documentType = this.documentTypeRepository.findOneById(user.documentTypeId);

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountTypeData = this.accountypeRepository.findAll();
      if(typeof accountTypeData === 'undefined') throw new NotAcceptableException(`No hay accountType existente`);

      const newAccount = new CreateAccountdto();
      newAccount.customer = customer.id;
      newAccount.accountTypeId = accountTypeData[0].id;

      const account = this.accountService.createAccount(newAccount);

      if (!account) throw new InternalServerErrorException();

      // return jwt.sign(
      //   { email: user.email, password: user.password },
      //   process.env.TOKEN_SECRET || 'tokentest',
      // );
      return 'token'
    } else throw new InternalServerErrorException();
  }

  signOut(JWToken: string , res:Response): void {
   //\\res.clearCookie(JWToken);
  }
}

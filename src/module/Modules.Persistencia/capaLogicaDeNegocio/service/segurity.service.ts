import {
  Inject,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
    forwardRef,
  } from '@nestjs/common';
  
import jwt  from 'jsonwebtoken';
import { Response } from 'express';
import { CustomerEntity } from 'src/module/customer/capaDeDato/entity/customer.entity';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from '../../../account/capaDeDato/entity/account.entities';
import { AccountService } from 'src/module/account/capaLogicaDeNegocio/service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { CustomerRepository, DocumentTypeEntity } from '../../../customer';
import { CreateAccountdto } from '../../../account/capaLogicaDeNegocio/dto/create-account.dto';
import { AccountTypeEntity } from '../../../account/capaDeDato/entity';


@Injectable()
export class SegurityService {
  @Inject(forwardRef(() => AccountService))
  private readonly accountService: AccountService;

  constructor(
      private readonly customerRepository: CustomerRepository) {}
      

  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password
    );
    if (!answer)  throw new UnauthorizedException();
    
    return jwt.sign({id: user.username},process.env.TOKEN_SECRET || `tokentest`);
  }

  signUp(user: SignUpDto): string {

    //Creo un tipo de documento
    const documentType= new DocumentTypeEntity();
    documentType.id = user.documentTypeId

    //Creo un Cliente
    const newCustomer = new CustomerEntity();

    //Le seteo los valores del DTO para las validaciones
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    //Registro el cliente en la base de datos
    const customer = this.customerRepository.register(newCustomer);

    //En el caso de toparse con algun error,   que retorne una exepcion
    if (!customer) throw new InternalServerErrorException();

    //Creo un tipo de cuenta
    const accountType = new AccountTypeEntity();

    //Le seteo la id
    accountType.id = uuid()

    //Creo una nueva cuenta
    let newAccount = new AccountEntity();

    //enlazo la cuenta con el id del cliente 
    newAccount.coustomer_id = customer

    //Enlazo la cuenta con un tipo de cuenta
    newAccount.account_type_id = accountType;

    //instancio un DTO para crear la cuenta con el cliente y tipo de cuenta
    const newCreateAccount = new CreateAccountdto();
    newCreateAccount.accountTypeId =  accountType.id;
    newCreateAccount.customer = newCustomer.id;

    //Creo la cuenta pasandole el DTO 
    const account = this.accountService.createAccount(newCreateAccount);

    //Si la cuenta no se pudo crear entonces le mando una exepcion
    if (!account) throw new InternalServerErrorException();
    
    //Si se creo el cliente y la cuenta correctamente retorno un jwt
    return jwt.sign({_id: account.id},process.env.TOKEN_SECRET || ` tokentest`) ;  
  }

  signOut(JWToken: string , res:Response): void {
    res.clearCookie(JWToken);
  }
}

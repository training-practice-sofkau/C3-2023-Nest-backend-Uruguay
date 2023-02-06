import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  
} from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/business/dtos';
import {
  CustomerRepository,
  DocumentTypeEntity,
  CustomerEntity,
  AccountTypeEntity,
  AccountEntity,
} from 'src/Data';
import { AccountService } from '../account';
import * as jwt from "jsonwebtoken"
import { DocumentTypeRepository } from '../../../Data/persistence/repositories/document-type.repository';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly DocumentTypeRepository: DocumentTypeRepository,

  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
 signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password,
    );
    if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
    //'Falta retornar un JWT';
    else throw new UnauthorizedException("User Incorrect");
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: SignUpDto): string {
    const documentType = new DocumentTypeEntity();
    const newCustomer = new CustomerEntity();
    documentType.name = user.document

    newCustomer.state  = true;
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;  

    const customer = this.customerRepository.register(newCustomer);
    this.DocumentTypeRepository.register(documentType)
    if (customer) {

      const accountType = new AccountTypeEntity();
      accountType.id = customer.id;
      accountType.name = user.accountTypeName;
      const newAccount = new AccountEntity();
      newAccount.customer = customer;
      newAccount.accountType = accountType;
      newAccount.acc_Balance = 0
      newAccount.state = true;
      
      const account = this.accountService.createAccount(newAccount);
      console.log(account)

      if (account)
      return jwt.sign({ id: customer.id },   process.env.TOKEN_SECRET || "tokentest");
      else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    if (!jwt.verify(JWToken, process.env.TOKEN_SECRET || "tokentest"))throw new Error('Method not implemented.'); 
      console.log("Sign Out Complete")
  }

  
}

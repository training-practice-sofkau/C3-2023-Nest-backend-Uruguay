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

@Injectable()
export class SecurityService {
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
  signIn(user: SignInDto): string {
    const jwt = require('jsonwebtoken');

    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password,
    );
    if (answer) return 'any';
    else throw new UnauthorizedException();
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
      const jwt = require('jsonwebtoken');

      const accountType = new AccountTypeEntity();
      accountType.id = customer.id;
      const newAccount = new AccountEntity();
      newAccount.customer = customer;
      newAccount.accountType = accountType;

      const account = this.accountService.createAccount(newAccount);

      if (account)
        return jwt.sign({id: user.id}, process.env.TOKEN_SECRET || 'tokentest');
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
    const jwt = require('jsonwebtoken');
    jwt.invalidate(JWToken, process.env.TOKEN_SECRET);
  }
}

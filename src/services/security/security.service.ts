// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// Data transfer objects
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from 'src/dtos/sign-up.dto';

// Repositories
import { CustomerRepository } from '../../persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import {
  CustomerEntity,
  DocumentTypeEntity,
} from '../../persistence/entities';
// JWT
import * as jwt from "jsonwebtoken"
import { AccountEntity } from '../../persistence/entities/account.entity';
import { CreateAccountDto } from '../../dtos/createAccount.dto';
import { AccountTypeEntity } from '../../persistence/entities/account-type.entity';


@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) { }
  /**
 * Identificarse en el sistema
 *
 * @param {CustomerModel} user
 * @return {*}  {string}
 * @memberof SecurityService
 */
  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
    else throw new UnauthorizedException()
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: SignUpDto): string {
    const documentType = new DocumentTypeEntity()
    documentType.id = user.documentTypeId

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    if (customer) {
      const accountEnt = new AccountEntity()
      accountEnt.id = uuid();
      const accountType = new AccountTypeEntity()
      accountEnt.accountType = accountType
      const newAccount = new CreateAccountDto()
      newAccount.accountTypeId = accountType.id
      newAccount.customerId = newCustomer.id

      const account = this.accountService.createAccount(newAccount)

      if (account) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
      else throw new InternalServerErrorException()
    } else throw new InternalServerErrorException()
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {

  }
}
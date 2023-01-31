import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import {
  AccountTypeEntity,
  AccountTypeRepository,
  CustomerEntity,
  CustomerRepository,
  DocumentTypeEntity,
} from 'src/data/persistence';
import { CreateAccountDTO, SingInDTO, SingUpDTO } from 'src/business/dtos';
import { AccountService } from '../account';
import * as jwt from 'jsonwebtoken';
import { SingOutDTO } from 'src/business/dtos/sing-out.dto';
import { DocumentTypeRepository } from '../../../data/persistence/repositories/document-type.repository';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly accountTypeRepository: AccountTypeRepository,
    private readonly customerService: CustomerService,
    private readonly documentTypeRepository: DocumentTypeRepository,
  ) {}

  /**
   * Identificarse en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signIn(user: SingInDTO): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.username,
      user.password,
    );

    if (!answer) throw new UnauthorizedException();

    return jwt.sign(
      { id: user.username },
      process.env.TOKEN_SECRET || 'tokentest',
    );
  }

  /**
   * Crear usuario en el sistema
   *
   * @param {CustomerModel} user
   * @return {*}  {string}
   * @memberof SecurityService
   */
  signUp(user: SingUpDTO): string {
    console.log(user.documentTypeId)
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
      const accountTypeData = this.accountTypeRepository.findAll({offset:0}).at(0);
      if(typeof accountTypeData === 'undefined') throw new NotAcceptableException();

      const newAccount = new CreateAccountDTO();
      newAccount.customerId = customer.id;

      newAccount.accountTypeId = accountTypeData.id;

      const account = this.accountService.createAccount(newAccount);

      if (!account) throw new InternalServerErrorException();

      return jwt.sign(
        { email: user.email, password: user.password },
        process.env.TOKEN_SECRET || 'tokentest',
      );
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */
  signOut(JWToken: string): void {
    if(!jwt.verify(JWToken, process.env.TOKEN_SECRET || 'tokentest')) throw new Error('JWT Not Valid')
  
    console.log('SingOut Completed')
  }
}

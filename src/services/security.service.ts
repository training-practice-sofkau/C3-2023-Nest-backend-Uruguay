  import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';

  import { v4 as uuid } from 'uuid';
  
  // Data transfer objects
  
  // Models
  import { CustomerModel } from '../models';
  
  // Repositories
  import { CustomerRepository } from '../persistence';
  
  // Services
  import { AccountService } from '.';
  
  // Entities
  import { AccountTypeEntity, CustomerEntity, AccountEntity } from '../persistence/entities';
  
  // Jwt
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
    ) {}
  
    signIn(user: CustomerModel): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer) return this.jwtService.sign({id: user.id});
      else throw new UnauthorizedException();
    }

    signUp(user: CustomerModel): string {
      const newCustomer = new CustomerEntity();
      newCustomer.documentType = user.documentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;
  
      const customer = this.customerRepository.register(newCustomer);
  
      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = uuid();
        const newAccount = new AccountEntity()
        newAccount.customer = customer
        newAccount.accountType = accountType
        newAccount.balance = 0
        newAccount.id = uuid()
        newAccount.state = false
  
        const account = this.accountService.createAccount(newAccount);
  
        if (account) return this.jwtService.sign({id: account.id});
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    signOut(JWToken: string): void {
      throw new Error('Method not implemented.');
    }
  }
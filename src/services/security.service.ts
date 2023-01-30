  import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';

  import { v4 as uuid } from 'uuid';
  
  // Data transfer objects
  import { SignInDto, SignUpDto } from '../dtos';
  
  // Repositories
  import { CustomerRepository } from '../persistence';
  
  // Services
  import { AccountService } from '.';
  
  // Entities
  import { AccountTypeEntity, CustomerEntity, AccountEntity, DocumentTypeEntity } from '../persistence/entities';
  
  // Jwt
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
    ) {}
  
    signIn(user: SignInDto): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer) return this.jwtService.sign({id: answer.id});
      else throw new UnauthorizedException();
    }

    signUp(user: SignUpDto): string {
      const documentType = new DocumentTypeEntity()
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
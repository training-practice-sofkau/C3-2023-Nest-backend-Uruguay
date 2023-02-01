  import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
  
  // Data transfer objects
  import { SignInDto, SignUpDto } from '../../business/dtos';
  
  // Services
  import { AccountService } from '.';
  
  // Entities
  import { AccountTypeEntity, CustomerEntity, DocumentTypeEntity } from '../../data/persistence/entities';
  import { CustomerService } from './customer.service';
  // Jwt
  import { JwtService } from '@nestjs/jwt';
  import { AccountEntity } from '../../data/persistence/entities/account.entity';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerService: CustomerService,
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
    ) {}
  
    signIn(user: SignInDto): string {
      const answer = this.customerService.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer) return this.jwtService.sign({ answer }, { secret: "Sofka", expiresIn: "30d" });
      else throw new UnauthorizedException();
    }

    signUp(user: SignUpDto): Array<Object> {
      const documentType = new DocumentTypeEntity()
      documentType.name = user.documentTypeName;

      const newCustomer = new CustomerEntity();
      newCustomer.documentType = documentType;
      newCustomer.document = user.document;
      newCustomer.fullName = user.fullName;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      this.customerService.getCustomerTypeRepo().register(documentType);
      const customer = this.customerService.register(newCustomer);
  
      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.name = user.accountTypeName;
        this.accountService.getAccountTypeRepo().register(accountType);
        
        const newAccount = new AccountEntity();
        newAccount.accountType = accountType;
        newAccount.balance = user.balance || 0;
        newAccount.customer = customer;
  
        const account = this.accountService.createAccount(newAccount);
  
        //if (account) return this.jwtService.sign({id: account.id});
        if (account) {
          const token = this.jwtService.sign({ account }, { secret: "Sofka", expiresIn: "30d" })
          return [account, token];
        }
        else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    signOut(JWToken: string): void {
      throw new Error('Method not implemented.');
    }
  }
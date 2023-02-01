  import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
  // Data transfer objects
  import { SignInDto, SignUpDto } from '../../business/dtos';
  // Services
  import { AccountService, CustomerService } from '.';
  // Entities
  import { AccountEntity, AccountTypeEntity, CustomerEntity, DocumentTypeEntity } from '../../data/persistence/entities';
  // Jwt
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class SecurityService {
    constructor(
      private readonly customerService: CustomerService,
      private readonly accountService: AccountService,
      private readonly jwtService: JwtService
    ) {}
  
    signIn(user: SignInDto): Array<Object> {
      const answer = this.customerService.findOneByEmailAndPassword( user.email, user.password );
      if (answer) {
        const token = this.jwtService.sign({ username: answer.email, sub: answer.id }, { secret: "Sofka", expiresIn: "30d" });
        return [answer, token];
      }
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

        if (account) {
          const token = this.jwtService.sign({ username: newCustomer.email, sub: newCustomer.id }, { secret: "Sofka", expiresIn: "30d" });
          return [account, token];
        } else throw new InternalServerErrorException();
      } else throw new InternalServerErrorException();
    }
  
    signOut(JWToken: string): string {
      try {
        const token = this.jwtService.verify(JWToken, { secret: "Sofka" });
        return token;
      } catch {
        return 'false';
      }
    }
  }
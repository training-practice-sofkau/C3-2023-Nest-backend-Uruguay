// Libraries
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// Data transfer objects

// Models


// Repositories
import { CustomerRepository } from '../../persistence/repositories';

// Services
import { AccountService } from '../account';

// Entities
import { AccountTypeEntity, CustomerEntity } from '../../persistence/entities';
import { SignInDto } from '../../dtos/sign-in.dto';
import { DocumentTypeEntity } from '../../persistence/entities/document-type.entity';
import { SignUpDto } from '../../dtos/sign-up.dto';

@Injectable()
export class SecurityService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
  ) {}


  signIn(user: SignInDto): string {
    const answer = this.customerRepository.findOneByEmailAndPassword(
      user.email,
      user.password,
    );
    if (answer) return 'Falta retornar un JWT';
    else throw new UnauthorizedException();
  }

 
  signUp(user: SignUpDto): string {
    const documentType = new DocumentTypeEntity();
    documentType.id = user.document;
    
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
      accountType.id = 'Falta el ID por defecto del tipo de cuenta';
      const newAccount = {
        customer,
        accountType,
      };

      const account = this.accountService.createAccount(newAccount);

      if (account) return 'Falta retornar un JWT';
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
    throw new Error('Method not implemented.');
  }
}

// Libraries
import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
  // Data transfer objects


  // Models
  import { CustomerModel } from '../../models';

  // Repositories
  import { CustomerRepository } from '../../persistence/repositories';

  // Services
  import { AccountService } from '../account';

  // Entities
  import { AccountTypeEntity, CustomerEntity } from '../../persistence/entities';
import { AccountEntity } from '../../persistence/entities/account.entity';

  @Injectable()
  export class SecurityService {

    constructor(
      private readonly customerRepository: CustomerRepository,
      private readonly accountService: AccountService,
      private jwtService: JwtService,
    ) {}

    /**
     * Login to the system
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signIn(user: CustomerModel): string {
      const answer = this.customerRepository.findOneByEmailAndPassword(
        user.email,
        user.password,
      );
      if (answer){
        return this.jwtService.sign(""); 
      } 
      else throw new UnauthorizedException();
    }

    /**
     * Create a new user
     *
     * @param {CustomerModel} user
     * @return {*}  {string}
     * @memberof SecurityService
     */
    signUp(user: CustomerModel): string {

      const newCustomer = new CustomerEntity();
      
      newCustomer.documentType = user.documentType;
      newCustomer.document = user.document;
      newCustomer.fullname = user.fullname;
      newCustomer.email = user.email;
      newCustomer.phone = user.phone;
      newCustomer.password = user.password;

      const customer = this.customerRepository.register(newCustomer);

      if (customer) {
        const accountType = new AccountTypeEntity();
        accountType.id = accountType.id;        
        const newAccount = {
          customer,
          accountType,
        };

        const account = this.accountService.createAccount(newAccount);

        if (account) return 'Falta retornar un JWT'; //TODO: JWT
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
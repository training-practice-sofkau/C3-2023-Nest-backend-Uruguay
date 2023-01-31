import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountTypeEntity, CustomerEntity, CustomerRepository, DocumentTypeEntity } from 'src/persistence';
import { AccountService } from '../account';
import { DocumentTypeRepository } from '../../persistence/repositories/document-type.repository';
import { SignUpDto } from 'src/data/dtos/sign-up.dto';
import { SignInDto } from 'src/data/dtos/sign-in.dto';
import * as jwt from "jsonwebtoken"
import { JsonWebTokenError } from 'jsonwebtoken';


@Injectable()
export class SecurityService {
  

    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly accountService: AccountService,
        private readonly documentTypeRepository:DocumentTypeRepository
        
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
        if (answer) return 'Falta retornar un JWT';
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
          const newAccount = {
            customer,
            accountType,
          };
          const account = this.accountService.createAccount(newAccount);
          if (account) {
            const payload = { customerId: customer.id };
            return this.account(payload);
          } else throw new InternalServerErrorException();
        } else throw new InternalServerErrorException();
    /*
        if (customer) {
          const accountType = new AccountTypeEntity();
          const newAccount = {
            customer,
            accountType,
          };
          
          //Mapear (no doy mas)

          const account = this.accountService.createAccount(newAccount);
          if (account) return 'Falta retornar un JWT';
          else throw new InternalServerErrorException();
        } else throw new InternalServerErrorException();

        */
      }
    
      /**
       * Salir del sistema
       *
       * @param {string} JWToken
       * @memberof SecurityService
       */
      signOut(JWToken: string): void {
               
           jwt.verify(JWToken, 'secret'), (err:JsonWebTokenError, decoded:any) => {
            if (err) {
                console.log('Invalid token');
            } else {
                // Eliminar el token del almacenamiento local del cliente
                localStorage.removeItem('token');
                // Redirigir al usuario a la página de inicio de sesión
                window.location.href = '/login';
            }throw new Error('Method not implemented.');
      }

    }

}
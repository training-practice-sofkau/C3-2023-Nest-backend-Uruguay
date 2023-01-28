import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CustomerModel } from 'src/models';
import { AccountTypeEntity, CustomerEntity, CustomerRepository } from 'src/persistence';
import { AccountService } from '../account';
import { DocumentTypeRepository } from '../../persistence/repositories/document-type.repository';


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
      signIn(user: CustomerModel): string {
        const answer = this.customerRepository.findOneByEmailAndPassword(
          user.email,
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
      signUp(user: CustomerModel): string {
        const newCustomer = new CustomerEntity();
       
        //newCustomer.documentTypeRepository = user.documentType;
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
    
          const account = 
          this.accountService.createAccount(newAccount);
    
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
        
           jwt.verify(JWToken, 'secret', (err, decoded) => {
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

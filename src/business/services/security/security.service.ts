import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccountTypeEntity, CustomerEntity, CustomerRepository, DocumentTypeEntity } from 'src/data/persistence';
import { AccountService } from '../account';
import { DocumentTypeRepository } from '../../../data/persistence/repositories/document-type.repository';
import { SignUpDto } from 'src/business/dtos/sign-up.dto';
import { SignInDto } from 'src/business/dtos/sign-in.dto';
import { AccountEntity } from '../../../data/persistence/entities/account.entity';
import { AccountTypeRepository } from '../../../data/persistence/repositories/account-type.repository';
import { JwtService } from '@nestjs/jwt';
import * as jwt from "jsonwebtoken"
import { CreateAccountDto } from 'src/business/dtos/createAccount.dto';

@Injectable()
export class SecurityService {


  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountTypeRepository: AccountTypeRepository,
    private jwtService: JwtService


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
      user.username,
      user.password,
    );
    if (answer) return jwt.sign(user, process.env.TOKEN_SECRET || "tokentest")
    //'Falta retornar un JWT';
    else throw new UnauthorizedException("User Incorrect");
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
    documentType.name = user.documentTypeName;
    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = user.document;
    newCustomer.fullName = user.fullName;
    newCustomer.email = user.email;
    newCustomer.phone = user.phone;
    newCustomer.password = user.password;

    const customer = this.customerRepository.register(newCustomer);

    console.log(customer)

    if (customer) {
      const newAccount = new CreateAccountDto()
      newAccount.Customerid = customer.id
      newAccount.account_type_id = user.accountTypeId
      newAccount.balance = user.balance || 0

      //createAccount que recibe DTO O ENTITY????????
      const account = this.accountService.createAccount(newAccount);
      if (account) {
        //this.jwtService.verify(JWToken, { secret: "Sofka" });
        return this.jwtService.sign({ id: customer.id }, { secret: "Sof" });

      } else throw new InternalServerErrorException();
    } else throw new InternalServerErrorException();
  }

  /**
   * Salir del sistema
   *
   * @param {string} JWToken
   * @memberof SecurityService
   */

  /*
    signOut(JWToken: string): void {
         jwt.verify(JWToken, 'secret'){
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
*/
}
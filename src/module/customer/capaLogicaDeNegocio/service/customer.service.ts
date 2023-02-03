import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from "../../capaDeDato/repository/customer.repository";
import { CustomerEntity } from 'src/module/customer/capaDeDato/entity/customer.entity';
import { CustomerDto } from '../dto/customer.dto';
import { AccountService } from 'src/module/account/capaLogicaDeNegocio/service';
import { DocumentTypeEntity } from '../../capaDeDato/entity';
import { DocumentTypeRepository } from '../../capaDeDato/repository';
import { DocumentTypeDto } from '../dto/documentType.dto';
import { CustomerStateDTO } from '../dto/customerStateDto';

@Injectable()
export class CustomerService {

  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly documentTypeRepository: DocumentTypeRepository,
    private readonly accountService: AccountService) {}

  /**
   * Obtener información de un cliente
   */
  createCustomer(customer: CustomerDto):CustomerEntity {
    const documentType = new DocumentTypeEntity();
    documentType.id = customer.documentType;

    const newCustomer = new CustomerEntity();
    newCustomer.document = customer.document;
    newCustomer.documentType = documentType;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;

    return this.customerRepository.register(newCustomer);
  }

  createDocumentType(documentType : DocumentTypeDto):DocumentTypeEntity{
    const newDocumentType = new DocumentTypeEntity();
    newDocumentType.name = documentType.name;
    return this.documentTypeRepository.register(newDocumentType);
  }

  getCustomerInfo(customerId: string): CustomerEntity {
    let customer = this.customerRepository.findOneById(customerId);  
    return customer;
  }
  findOneByEmailAndPassword(email: string, password: string):CustomerEntity{
    let Customer = this.customerRepository.findOneByEmailAndPassword(email,password);
    if(!Customer) throw new NotFoundException(`Email : ${email} and password: ${password} Not found`);
    return Customer;
  }

  findAll(): CustomerEntity[] {
    return this.customerRepository.findAll();
  }
  findAllDocumentType(): DocumentTypeEntity[] {
    return this.documentTypeRepository.findAll();
  }

  findByIdDocumentType(id : string):DocumentTypeEntity{
    return this.documentTypeRepository.findOneById(id);
  }
  /**
   * Actualizar información de un cliente
   */
  updatedCustomer(id: string, newCustomer: CustomerDto ): CustomerEntity{
    let customer = this.customerRepository.findOneById(id);
    
    
    let documentType = new DocumentTypeEntity();
    documentType.id = newCustomer.documentType;

    
    customer.documentType = documentType;
    customer.document = newCustomer.document;
    customer.fullName = newCustomer.fullName;
    customer.email = newCustomer.email;
    customer.phone = newCustomer.phone;
    customer.password = newCustomer.password;

    return this.customerRepository.update(id,customer);
    
  }

  /**
   * Dar de baja a un cliente en el sistema
   */
  unsubscribe(id: string): boolean {

    const accounts = this.accountService.findByCustomer(id);

    const index = accounts.findIndex((account) => account.balance != 0);

    if (index != -1)throw new Error( 'La cuenta tiene balance 0 ', );
      
    this.customerRepository.delete(id, true);

    return true;

  }

  changeState(customerId: string ,state: CustomerStateDTO): void {
    const customer = this.customerRepository.findOneById(customerId);
    customer.state = state.state;

    this.customerRepository.update(customerId, customer);
  }

  deleteCustomer(customerId: string, soft?: boolean): void {
    if(soft) this.customerRepository.delete(customerId, soft);

    this.customerRepository.delete(customerId);
  }


}
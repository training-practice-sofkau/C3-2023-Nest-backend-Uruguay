import { Injectable } from '@nestjs/common';
import { PaginationModel } from 'src/data/models';
import { CustomerEntity, CustomerRepository, DocumentTypeRepository } from 'src/data/persistence';
import { CreateCustomerDTO, UpdateCustomerDTO, TypeDTO } from 'src/business/dtos';
import { AccountService } from '../account';
import { DocumentTypeEntity } from '../../../data/persistence/entities/document-type.entity';
import { CustomerStateDTO } from 'src/business/dtos/customer-state.dto';
import { NationalIdStrategy, DocumentTypeContext, PassportStrategy } from '../../../data/StrategyPattern/DocumentType/document-type-strategy';


@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly accountService: AccountService,
    private readonly documentTypeRepository: DocumentTypeRepository,
  ) {}

  createCustomer(customer: CreateCustomerDTO) {
    const documentTypeId = customer.documentType;
    const documentType = this.documentTypeRepository.findOneById(documentTypeId);

    const newCustomer = new CustomerEntity();
    newCustomer.documentType = documentType;
    newCustomer.document = customer.document;
    newCustomer.email = customer.email;
    newCustomer.fullName = customer.fullName;
    newCustomer.password = customer.password;
    newCustomer.phone = customer.phone;

    return this.customerRepository.register(newCustomer);
  }

  createDocumentType(documentTypeDTO: TypeDTO): DocumentTypeEntity {
    const newDocumentType = new DocumentTypeEntity();
    newDocumentType.name = documentTypeDTO.name;

    return this.documentTypeRepository.register(newDocumentType);
  }

  /**
   * Obtener información de un cliente
   *
   * @param {string} customerId
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */
  getCustomerInfo(customerId: string): CustomerEntity {
    return this.getCustomer(customerId);
  }

  findAll(pagination: PaginationModel): CustomerEntity[] {
    return this.customerRepository.findAll(pagination);
  }

  findAllDocumentTypes(pagination: PaginationModel): DocumentTypeEntity[] {
    return this.documentTypeRepository.findAll(pagination);
  }

  findDocumentType(documentTypeId: string): DocumentTypeEntity {
    return this.documentTypeRepository.findOneById(documentTypeId);
  }

  /**
   * Actualizar información de un cliente
   *
   * @param {string} id
   * @param {CustomerModel} customer
   * @return {*}  {CustomerEntity}
   * @memberof CustomerService
   */

  updatedCustomer(id: string, newCustomer: UpdateCustomerDTO): CustomerEntity {
    let customer = this.getCustomer(id);

    if (newCustomer.documentType === 'National ID') {
      const national = new NationalIdStrategy();
      const accountTypeContext = new DocumentTypeContext(national);
      customer.documentType = accountTypeContext.assignAccountTypeStrategy();
    } 
    else if (newCustomer.documentType === 'Passport ID') {
      const passport = new PassportStrategy();
      const accountTypeContext = new DocumentTypeContext(passport);

      customer.documentType = accountTypeContext.assignAccountTypeStrategy();
    }


    customer.document = newCustomer.document;
    customer.email = newCustomer.email;
    customer.fullName = newCustomer.fullName;
    customer.password = newCustomer.password;
    customer.phone = newCustomer.phone;
    customer.state = newCustomer.state;

    return this.customerRepository.update(id, customer);
  }

  changeState(customerId: string): void {
    const customer = this.getCustomer(customerId);

    if(customer.state) {
      customer.state = false;
    } else {
      customer.state = true;
    }

    this.customerRepository.update(customerId, customer);
  }

  /**
   * Dar de baja a un cliente en el sistema
   *
   * @param {string} id
   * @return {*}  {boolean}
   * @memberof CustomerService
   */
  unsubscribe(id: string): boolean {
    const accounts = this.accountService.findByCustomer(id);

    const index = accounts.findIndex((account) => account.balance != 0);

    if (index != -1)
      throw new Error(
        'Cannot Delete this Customer. Your accounts need a balance of 0',
      );
      
    this.customerRepository.delete(id, true);

    return true;
  }

  deleteCustomer(customerId: string): void {
      this.customerRepository.delete(customerId);
  }

  private getCustomer(customerId: string): CustomerEntity {
    return this.customerRepository.findOneById(customerId);
  }
}

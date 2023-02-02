import { DocumentTypeEntity } from 'src/data/persistence';
import { TypeDTO } from '../../../business/dtos/type.dto';
import { NotFoundException } from '@nestjs/common';
export interface DocumentTypeFactoryI {
    create(accountTypeDTO: TypeDTO): DocumentTypeEntity;
  }
  
  export class NationalID implements DocumentTypeFactoryI {
    private static instance: DocumentTypeEntity;
  
    constructor() {}
  
    create(accountTypeDTO: TypeDTO): DocumentTypeEntity {
      NationalID.instance = new DocumentTypeEntity();
      NationalID.instance.name = 'National ID';
      return NationalID.instance;
    }
  
    getInstance(documentTypeDTO: TypeDTO): DocumentTypeEntity {
      if (!NationalID.instance) {
        NationalID.instance = this.create(documentTypeDTO);
      }
  
      return NationalID.instance;
    }
  }
  
  export class PassportID implements DocumentTypeFactoryI {
    private static instance: DocumentTypeEntity;
  
    constructor() {}
  
    create(accountTypeDTO: TypeDTO): DocumentTypeEntity {
      PassportID.instance = new DocumentTypeEntity();
      PassportID.instance.name = 'Passport ID';
      return PassportID.instance;
    }
  
    getInstance(accountTypeDTO: TypeDTO): DocumentTypeEntity {
      if (!PassportID.instance) {
        PassportID.instance = this.create(accountTypeDTO);
      }
  
      return PassportID.instance;
    }
  }
  
  export class DocuemntTypeFactory {
  
    createAccountType(accountType: TypeDTO): DocumentTypeEntity {
  
  
      if (accountType.name === 'National ID') {
          const account = new NationalID();
          return account.getInstance(accountType);
      } else if (accountType.name === 'Passport ID') {
          const account = new PassportID();
          return account.getInstance(accountType);
      } else {
          throw new NotFoundException();
      }
  
    }
  }
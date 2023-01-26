import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type-entity";
import { CustomerEntity } from "../entities/customer-entity";
import { IRepository } from "./interface/i-base/i-repository";
import { BaseRepository } from "./repo-base/base-repository";

@Injectable()
export class TypeAccountRepo extends BaseRepository<AccountTypeEntity > implements IRepository<AccountTypeEntity >{ //Consultar??
   
   
  register(entity: CustomerEntity): AccountTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity; //?
  }

  update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as AccountTypeEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  findAll(): AccountTypeEntity[] {
    return this.database.filter(
      (item) => typeof item.daletedAt === 'undefined', //??
    );
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  //**PROPIOS DE LA ENTIDAD -->

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.daletedAt === 'undefined',
    );
    return indexCurrentEntity >= -1 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findOneByEmail(email: string): CustomerEntity {


    throw new Error('This method is not implemented');
  }

  findOneByPhone(phone: string): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findByState(state: boolean): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findByFullName(fullName: string): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }
}

   


import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from "./repo-base/base-repository";
import { CustomerEntity } from "../entities/customer-entity";
import { IRepository } from "./interface/i-base/i-repository";


@Injectable()
export class CustomerRepo extends BaseRepository<CustomerEntity> implements IRepository<CustomerEntity>{ //Consultar??
   
   
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity; //?
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
    return this.database[indexCurrentEntity];
  }

  findAll(): CustomerEntity[] {
    return this.database.filter((item) => typeof item.daletedAt === 'undefined');
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find((item) => item.id === id && typeof item.daletedAt === 'undefined');
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  //**METODOS PROPIOS DE LA ENTIDAD -->

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
    const currentEntity = this.database.find(
      (item) => item.documentType.id === documentTypeId && item.document === document && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }



  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.email === email && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }



  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.phone === phone && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }




  findByState(state: boolean): CustomerEntity[] {
    return this.database.filter(
      (item) => item.state === state && typeof item.daletedAt === 'undefined',
  );
  }



  findByFullName(fullName: string): CustomerEntity[] {
    const currentEntity = this.database.filter(
      (item) => item.fullName === fullName && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }
}

   


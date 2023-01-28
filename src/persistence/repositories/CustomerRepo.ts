import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from "./repo-base/base-repository";
import { CustomerEntity } from "../entities/customer-entity";
import { IRepository } from "./interface/i-base/i-repository";
import { PaginationModel } from "src/models/i-pagination-model";


@Injectable()
export class CustomerRepo extends BaseRepository<CustomerEntity> implements IRepository<CustomerEntity>{ //Consultar??


  register(entity: CustomerEntity): CustomerEntity {

    this.database.push(entity);

    return this.database.at(-1) ?? entity; //?
  }



  update(id: string, entity: CustomerEntity): CustomerEntity {

    const indexCurrentEntity = this.database.findIndex((obj) => obj.id === id && typeof obj.daletedAt === 'undefined');

    if (indexCurrentEntity >= 0) this.database[indexCurrentEntity] = { ...this.database[indexCurrentEntity], ...entity, id, } as CustomerEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');

    return this.database[indexCurrentEntity];
  }



  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  private softDelete(index: number): void {
    this.database[index].daletedAt = Date.now();
  }

  delete(id: string, soft: boolean): void {

    const index = this.database.findIndex(obj => obj.id === id);

    if (!index) throw new NotFoundException('Lo siento, no se encontro ese index!');

    if (soft) {
      this.softDelete(index);
    } else {
      this.hardDelete(index);
    }
  }



  findAll(): CustomerEntity[] {

    return this.database.filter((obj) => typeof obj.daletedAt === 'undefined');
  }



  findOneById(id: string): CustomerEntity {

    const currentEntity = this.database.find((obj) => obj.id === id && typeof obj.daletedAt === 'undefined');

    if (currentEntity) return currentEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }



  //**METODOS PROPIOS DE LA ENTIDAD -->
  findOneByEmailAndPassword(email: string, password: string): boolean {

    const index = this.database.findIndex((obj) => obj.email === email && obj.password === password && typeof obj.daletedAt === 'undefined');

    let result: boolean = false

    if (index > -1) {
      result = true
    }
    return result
  }



  findOneByDocumentTypeAndDocument(documentTypeId: string, document: string): CustomerEntity {

    const currentEntity = this.database.find((obj) => obj.documentType.id === documentTypeId && typeof obj.daletedAt === 'undefined');

    if (currentEntity) return currentEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }



  findOneByEmail(email: string): CustomerEntity {
    
    const currentEntity = this.database.find((obj) => obj.email === email && typeof obj.daletedAt === 'undefined');

    if (currentEntity) return currentEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }




  findOneByPhone(phone: string): CustomerEntity {

    const currentEntity = this.database.find((obj) => obj.phone === phone && typeof obj.daletedAt === 'undefined');

    if (currentEntity) return currentEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }



  findByState(state: boolean): CustomerEntity[] {

    return this.database.filter((obj) => obj.state === state && typeof obj.daletedAt === 'undefined');
  }



  findByFullName(fullName: string): CustomerEntity[] {

    const currentEntity = this.database.filter((obj) => obj.fullName === fullName && typeof obj.daletedAt === 'undefined');

    if (currentEntity) return currentEntity;

    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }


  private paginationMethod(pagination: PaginationModel): PaginationModel {
    
    return pagination = {... {offset: 0, limit: 10}, ... pagination}
  }


}




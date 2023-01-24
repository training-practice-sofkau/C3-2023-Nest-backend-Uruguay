import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities/customer.entity';
import { CRUDRepo } from './interfaces/CRUD.interface';
@Injectable()
export class CustomerRepository implements CRUDRepo{
    private readonly database: Array<CustomerEntity>;

    constructor() {
        this.database = new Array<CustomerEntity>;
    }
    register(entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: CustomerEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): CustomerEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): CustomerEntity {
        throw new Error('Method not implemented.');
    }


}

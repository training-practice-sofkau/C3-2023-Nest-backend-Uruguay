import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepositories } from '../';

@Injectable()
export class CustomerRepository implements BaseRepositories<CustomerEntity> {
    findAll(): CustomerEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): CustomerEntity {
        throw new Error('Method not implemented.');
    }
    register(entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}

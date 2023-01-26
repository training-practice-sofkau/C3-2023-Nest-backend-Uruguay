import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { Repository } from './base/repository.base';
import { IRepository } from './interfaces/repository.interface';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> implements IRepository<CustomerEntity>{
    
    register(entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.')
    }
    update(id: string, entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.')
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.')
    }
    findAll(): CustomerEntity[] {
        throw new Error('Method not implemented.')
    }
    findOneById(id: string): CustomerEntity {
        throw new Error('Method not implemented.')
    }
}
import { Injectable } from '@nestjs/common/decorators';
import { CustomerEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class CustomerRepository extends BankInternalControl<CustomerEntity> implements RepositoryMethodsInterface<CustomerEntity> {

    register(entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }

    update(id: string, entity: CustomerEntity): CustomerEntity {
        throw new Error('Method not implemented.');
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }

    findAll(): CustomerEntity[] {
        throw new Error('Method not implemented.');
    }

    findOneById(id: string): CustomerEntity {
        throw new Error('Method not implemented.');
    }  
}
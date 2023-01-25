import { Injectable } from '@nestjs/common/decorators';
import { DepositEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class DepositRepository extends BankInternalControl <DepositEntity> implements RepositoryMethodsInterface<DepositEntity> {
    
    register(entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    
    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    
    findAll(): DepositEntity[] {
        
        return this.database;
        
    }
    
    findOneById(id: string): DepositEntity {
        throw new Error('Method not implemented.');
    }
    
}
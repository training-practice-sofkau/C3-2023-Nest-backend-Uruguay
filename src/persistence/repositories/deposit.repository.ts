import { Injectable } from '@nestjs/common/decorators';
import { DepositEntity } from '../entities';
import { BankInternalControl } from './base';
import { DepositRepositoryInterface } from './interfaces';

@Injectable()
export class DepositRepository extends BankInternalControl<DepositEntity> implements DepositRepositoryInterface {
    
    register(entity: DepositEntity): DepositEntity {
       
        return entity;
        
    }
    
    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }
    
    findAll(): DepositEntity[] {
        
        return this.database;

    }
    
    findOneById(id: string): DepositEntity {
        throw new Error('Method not implemented.');
    }
 
    findByAccountId(accountId: string): DepositEntity[] {
        throw new Error('This method is not implemented');
    }

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
    ): DepositEntity[] {
        throw new Error('This method is not implemented');
    }
}
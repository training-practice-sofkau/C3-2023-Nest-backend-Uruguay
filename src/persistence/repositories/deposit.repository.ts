import { Injectable } from '@nestjs/common/decorators';
import { DepositEntity } from '../entities';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class DepositRepository implements RepositoryMethodsInterface<DepositEntity> {
    private readonly database: Array<DepositEntity>;

    constructor(){
        this.database = new Array<DepositEntity>();
    }
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
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): DepositEntity {
        throw new Error('Method not implemented.');
    }
}
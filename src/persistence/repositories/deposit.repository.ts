import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepositories } from '../';

@Injectable()
export class DepositRepository implements BaseRepositories<DepositEntity> {
    findAll(): DepositEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): DepositEntity {
        throw new Error('Method not implemented.');
    }
    register(entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}

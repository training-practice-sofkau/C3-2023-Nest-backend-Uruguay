import { Injectable } from '@nestjs/common';
import { Repository } from './base';
import { TransferEntity } from '../entities';

@Injectable()
export class TransferRepository extends Repository<TransferEntity>{
    register(entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    findAll(): TransferEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): TransferEntity {
        throw new Error('Method not implemented.');
    }
}
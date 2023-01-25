import { TransferEntity } from '../entities';
import { BaseRepositories } from '../';
export class TransferRepository implements BaseRepositories<TransferEntity> {
    findAll(): TransferEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): TransferEntity {
        throw new Error('Method not implemented.');
    }
    register(entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string): void {
        throw new Error('Method not implemented.');
    }
}

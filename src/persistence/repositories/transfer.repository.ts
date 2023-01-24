import { CRUDRepo } from './interfaces/CRUD.interface';
import { TransferEntity } from '../entities/transfer.entity';
export class TransferRepository implements CRUDRepo {

    private readonly database: Array<TransferEntity>;

    constructor() {
        this.database = new Array<TransferEntity>;
    }

    register(entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: TransferEntity): TransferEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: TransferEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): TransferEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): TransferEntity {
        throw new Error('Method not implemented.');
    }

}

import { CRUDRepo } from './interfaces/CRUD.interface';
import { DepositEntity } from '../entities/deposit.entity';
export class DepositRepository implements CRUDRepo {

    private readonly database: Array<DepositEntity>;

    constructor() {
        this.database = new Array<DepositEntity>;
    }

    register(entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    update(entity: DepositEntity): DepositEntity {
        throw new Error('Method not implemented.');
    }
    delete(entity: DepositEntity): void {
        throw new Error('Method not implemented.');
    }
    findAll(): DepositEntity[] {
        throw new Error('Method not implemented.');
    }
    findById(id: string): DepositEntity {
        throw new Error('Method not implemented.');
    }

}

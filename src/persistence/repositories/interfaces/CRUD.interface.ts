import { CustomerEntity } from "src/persistence/entities/customer.entity";
import { AccountEntity } from '../../entities/account.entity';

export interface CRUDRepo {
    register(entity: Object): Object;

    update(entity: Object): Object;

    delete(entity: Object): void;

    findAll(): Object[];

    findById(id: string): Object;
}
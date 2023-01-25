import { Injectable } from "@nestjs/common/decorators";
import { TransferEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class TransferRepository extends BankInternalControl<TransferEntity> implements RepositoryMethodsInterface<TransferEntity> {

    register(entity: TransferEntity): TransferEntity {
        throw new Error("Method not implemented.");
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    findAll(): TransferEntity[] {
        throw new Error("Method not implemented.");
    }

    findOneById(id: string): TransferEntity {
        throw new Error("Method not implemented.");
    }     
}
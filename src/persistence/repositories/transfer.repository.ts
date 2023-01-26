import { Injectable } from "@nestjs/common/decorators";
import { TransferEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class TransferRepository extends BankInternalControl<TransferEntity> implements RepositoryMethodsInterface<TransferEntity> {

    register(entity: TransferEntity): TransferEntity {

        return entity;
        
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error("Method not implemented.");
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    findAll(): TransferEntity[] {
        
        return this.database;

    }

    findOneById(id: string): TransferEntity {
        throw new Error("Method not implemented.");
    }     

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        throw new Error('This method is not implemented');
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
    ): TransferEntity[] {
        throw new Error('This method is not implemented');
    }
}
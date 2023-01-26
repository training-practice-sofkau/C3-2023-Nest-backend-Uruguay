import { Injectable } from "@nestjs/common";
import { TransferEntity } from "../entities/transfer.entity";
import { BaseRepository } from "./base";
import { TrasnferRepositoryInterface } from "./interfaces";

@Injectable()
export class TransferRepository
    extends BaseRepository<TransferEntity>
    implements TrasnferRepositoryInterface{

    register(entity: TransferEntity): TransferEntity {
        throw new Error('This method is not implemented');
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        throw new Error('This method is not implemented');
    }

    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
    }

    private hardDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    private softDelete(index: number): void {
        throw new Error('This method is not implemented');
    }

    findAll(): TransferEntity[] {
        throw new Error('This method is not implemented');
    }

    findOneById(id: string): TransferEntity {
        throw new Error('This method is not implemented');
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
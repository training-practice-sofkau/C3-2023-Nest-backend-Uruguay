import { Injectable } from "@nestjs/common";
import { DepositEntity } from "../entities/deposit.entity";
import { BaseRepository } from "./base";
import { DepositRepositoryInterface } from "./interfaces";

@Injectable()
export class DepositRepository
    extends BaseRepository<DepositEntity>
    implements DepositRepositoryInterface{
    register(entity: DepositEntity): DepositEntity {
        throw new Error('This method is not implemented');
    }

    update(id: string, entity: DepositEntity): DepositEntity {
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

    findAll(): DepositEntity[] {
        throw new Error('This method is not implemented');
    }

    findOneById(id: string): DepositEntity {
        throw new Error('This method is not implemented');
    }

    findByAccountId(accountId: string): DepositEntity[] {
        throw new Error('This method is not implemented');
    }

    findByDataRange(
        dateInit: Date | number,
        dateEnd: Date | number,
    ): DepositEntity[] {
        throw new Error('This method is not implemented');
    }
}
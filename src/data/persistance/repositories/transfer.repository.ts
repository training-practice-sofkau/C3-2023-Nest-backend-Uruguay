import { Injectable, NotFoundException } from "@nestjs/common";
import { PaginationModel } from "src/data/models";
import { TransferEntity } from "../entities";
import { BaseRepository } from "./base";
import { TrasnferRepositoryInterface } from "./interfaces";

@Injectable()
export class TransferRepository
    extends BaseRepository<TransferEntity>
    implements TrasnferRepositoryInterface {

    register(entity: TransferEntity): TransferEntity {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
    }

    update(id: string, entity: TransferEntity): TransferEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
                ...this.database[indexCurrentEntity],
                ...entity,
                id,
            } as TransferEntity
        else throw new NotFoundException()
        return this.database[indexCurrentEntity]
    }

    delete(id: string, soft?: boolean): void {
        const indexToDelete = this.database.findIndex(
            i => i.id === id &&
                typeof i.deletedAt === 'undefined'
        )
        soft ? this.softDelete(indexToDelete) : this.hardDelete(indexToDelete)
    }

    private hardDelete(index: number): void {
        if (index > -1) {
            this.database.splice(index, 1)
        }
    }

    private softDelete(index: number): void {
        if (index > -1) {
            this.database.find(index => index.deletedAt = new Date)
        }
    }

    findAll(): TransferEntity[] {
        return this.database.filter(
            (item) => typeof item.deletedAt === 'undefined',
        )
    }

    findOneById(id: string): TransferEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id && typeof item.deletedAt === 'undefined',
        );
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findOutcomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
        paginator?: PaginationModel,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (item) =>
                item.id === accountId
                && dateInit >= item.dateTime
                && item.dateTime <= dateEnd
                && typeof item.deletedAt === "undefined"
        )
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity.filter(item => item.outcome.id === accountId).slice(paginator?.offset, paginator?.limit)
    }

    findIncomeByDataRange(
        accountId: string,
        dateInit: Date | number,
        dateEnd: Date | number,
        paginator?: PaginationModel,
    ): TransferEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.id === accountId
                && dateInit > item.dateTime
                && item.dateTime < dateEnd
                && typeof item.deletedAt === "undefined"
        )
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity.filter(item => item.income.id === accountId).slice(paginator?.offset, paginator?.limit)
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountTypeEntity } from "../entities";
import { BaseRepository } from "./base";
import { AccountTypeRepositoryInterface } from "./interfaces";

@Injectable()
export class AccountTypeRepository
    extends BaseRepository<AccountTypeEntity>
    implements AccountTypeRepositoryInterface {

    register(entity: AccountTypeEntity): AccountTypeEntity {
        this.database.push(entity)
        return this.database.at(-1) ?? entity
    }

    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
        const indexCurrentEntity = this.database.findIndex(
            (item) => item.id === id,
        );
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
                ...this.database[indexCurrentEntity],
                ...entity,
                id,
            } as AccountTypeEntity;
        else throw new NotFoundException();
        return this.database[indexCurrentEntity];
    }

    delete(id: string, soft?: boolean | undefined): void {
        const indexToDelete = this.database.findIndex(i => i.id === id)
        //const indexToDelete = this.database.indexOf(this.findOneById(id))
        this.database.splice(indexToDelete, 1)
    }

    findAll(): AccountTypeEntity[] {
        return this.database
    }

    findOneById(id: string): AccountTypeEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByState(state: boolean): AccountTypeEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.state === state)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByName(name: string): AccountTypeEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.name === name)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }
}
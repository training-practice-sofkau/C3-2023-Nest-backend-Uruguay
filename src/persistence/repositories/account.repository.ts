import { Injectable } from "@nestjs/common/decorators";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common/exceptions";

import { AccountEntity } from '../entities';
import { BankInternalControl } from "./base";
import { AccountRepositoryInterface } from './interfaces';


@Injectable()
export class AccountRepository extends BankInternalControl<AccountEntity> implements AccountRepositoryInterface {
    

    /**
     * Adds a new Account entity to the Array of accounts
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: AccountEntity): AccountEntity {

        try { // try to add the entity to the array

            this.database.push(entity);

            return this.database.at(-1) ?? entity; // all good, returns the new entity 

        } catch (err) { // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)

        }
    }

    /**
     * Modify the data of the Account that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: AccountEntity): AccountEntity {

        try {

            const targetEntityIndex = this.findIndexById(id);

            if (targetEntityIndex == -1) { // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = { ...this.database[targetEntityIndex], ...entity, id: id } as AccountEntity; // update existing entity

            return this.database[targetEntityIndex]; // all good, returning update existing entity

        } catch (err) {// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Delete the Customer that matches a given Id
     * @param id unique key identifier
     * @param soft sets the deletion method to use (true = logical / false = permanent)
     */
    delete(id: string, soft?: boolean | undefined): void {

        try {

            const targetEntityIndex = this.findIndexById(id);

            if (targetEntityIndex == -1) { // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            if (typeof soft === undefined || soft === true) { // check if is a Logical Deletion

                this.softDelete(targetEntityIndex); // calls the internal soft delete method

            }
            else if (typeof soft !== undefined || soft === false) { // checks if is Physical Deletion

                this.hardDelete(targetEntityIndex); // calls the internal hard delete method
            }

        } catch (err) {// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Deletes physically the entity in the position of the given index
     * @param index index of the entity to delete
     */
    private hardDelete(index: number): void {

        try {

            this.database.splice(index);

        } catch (err) { // something went wrong

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Marks the entity in the index position as deleted (adds a timestamp in the deletedAt field)
     * @param index index of the entity to delete logicaly
     */
    private softDelete(index: number): void {

        try {

            this.database[index] = { ...this.database[index], deletedAt: new Date() };

        } catch (err) { // something went wrong

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Returns the content of the array of Customers
     * excludes the mark as deleted
     * @returns Array of entities 
     */
    findAll(): AccountEntity[] {

        try {

            return this.database.filter(entity => typeof entity.deletedAt === undefined); //applies filter for deleted ones

        } catch (err) {// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Search in the array for an entity that matches the Id provided
     * @param id unique key identifier 
     * @returns entity that matches the Id, if not present, it gives an NotFoundException
     */
    findOneById(id: string): AccountEntity {

        try { // try to find an entity with a given Id

            const index = this.findIndexById(id);

            if (index == -1) { // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        } catch (err) { // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }


    /**
     * Search in the DB for an element with the given ID 
     * @param id unique key identifier to find
     * @returns the index or an exception
     */
    findIndexById(id: string): number {
            
        try{ // try to find an element with a given Id

            const index = this.database.findIndex(entity => entity.id === id 
                            && typeof entity.deletedAt === undefined ) ; 

            if(index == -1) { throw new NotFoundException(); }

            return index; 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Find in the database all the entities with a given state
     * @param state value to check
     * @returns array of elements or an exception
     */
    findByState(state: boolean): AccountEntity[] {

        try { // try to find all entities with a given state

            const searchResult = this.database.filter(entity => entity.state === state && typeof entity.deletedAt === undefined); //searchs for the position in the array of the entity with Id

            if (searchResult.length <= 0) { // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the entity 

        } catch (err) { // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Searchs in the DB all the accounts of on customer
     * @param customerId unique key identifier of the customer
     * @returns array of accounts or and exception
     */
    findByCustomer(customerId: string): AccountEntity[] {

        try { // try to find all entities with a given CustomerId

            const searchResult = this.database.filter(entity => entity.customerId === customerId &&
                typeof entity.deletedAt === undefined); //searchs for entities that matches the criteria

            if (searchResult.length <= 0) { // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the entity 

        } catch (err) { // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Searchs in the DB all de account of a type
     * @param accountTypeId unique key identifier of the account type
     * @returns array of entities of type or an exception
     */
    findByAccountType(accountTypeId: string): AccountEntity[] {
        try { // try to find all entities of a given Type

            const searchResult = this.database.filter(entity => entity.accountTypeId === accountTypeId &&
                typeof entity.deletedAt === undefined); //searchs for entities that matches the criteria

            if (searchResult.length <= 0) { // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the entity 

        } catch (err) { // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Search in the DB any value provided by the property given
     * @param property property where to find
     * @param value value to find
     * @returns array of entities or and exception
     */
    findBy(property: keyof AccountEntity, value: string | number | boolean): AccountEntity[] {
        
        try{ 

            const searchResult = this.database.filter(entity => entity[property] === value); //searchs for entities that matches the criteria
           
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }
}
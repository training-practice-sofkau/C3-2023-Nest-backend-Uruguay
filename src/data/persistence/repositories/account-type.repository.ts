import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';

import { AccountTypeEntity } from "../entities";
import { BankInternalControl } from "./base";
import { AccountTypeRepositoryInterface } from "./interfaces";
import { PaginationModel } from '../../../business/models';
import { AccountTypeDto } from "../../../business/dtos";


@Injectable()
export class AccountTypeRepository extends BankInternalControl<AccountTypeEntity> implements AccountTypeRepositoryInterface{
    

    /**
     * Adds a new AccountType Entity to the Array of Accounts
     * @param accountType new object to be inserted in the array
     * @returns new entity added
     */
    register(accountType: AccountTypeDto): AccountTypeEntity {
        
        try{ 
            
            const newAccountType = new AccountTypeEntity();
            newAccountType.name = accountType.name;

            const res = this.database.push(newAccountType);            
            return this.database.at(-1) ?? newAccountType; // all good, returns the new entity 

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)
        }
    }

    /**
     * Modify the data of the AccountType that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: AccountTypeEntity): AccountTypeEntity {
       
        try{        
           
            const targetEntityIndex = this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity, id: id} as AccountTypeEntity; // update existing entity

            return this.database[targetEntityIndex]; // all good, returning update existing entity

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
    }

    /**
     * Delete the AccountType that matches a given Id
     * @param id unique key identifier
     * @param soft sets the deletion method to use (true = logical / false = permanent)
     */
    delete(id: string, soft?: boolean | undefined): void {
        
        try{        
           
            const targetEntityIndex =  this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }  
            
            this.database.splice(targetEntityIndex); // Physical delete ( this entity hasn't logical delete )
            

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error

        }
    }

    /**
     * Returns the content of the array of AccountTypes
     * @param pagination optional pagination to consider
     * @returns Array of entities 
     */
    findAll(pagination?: PaginationModel<AccountTypeEntity>): AccountTypeEntity[] {

        try{ 
        
            let result = this.database;

            if(pagination){
                let { offset = 0, limit = 0 } = pagination;
                result = result.slice(offset, offset + limit);
            }
            return result;

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Search in the array for an entity that matches the Id provided
     * @param id unique key identifier 
     * @returns entity that matches the Id, if not present, it gives an NotFoundException
     */
    findOneById(id: string): AccountTypeEntity {
        
        try{ // try to find an entity with a given Id

            const index = this.findIndexById(id);

            if(index == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        }catch(err){ // something wrong happened

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

            const index = this.database.findIndex(entity => entity.id === id); 

            if(index == -1) { throw new NotFoundException(); }

            return index; 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
         * Search in the DB any value provided by the property given
         * @param property property where to find
         * @param value value to find
         * @param pagination optional pagination to consider         
         * @returns array of entities or and exception
         */
    findBy(property: keyof AccountTypeEntity, value: string | number | boolean, pagination?: PaginationModel<AccountTypeEntity>): AccountTypeEntity[] {
            
        try{ 

            let searchResult = this.database.filter(entity => entity[property] === value); //searchs for entities that matches the criteria
        
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            
            if (pagination) { // if there is a pagination provided
                let { offset = 0, limit = 0 } = pagination;
                searchResult = searchResult.slice(offset, offset + limit);
            }  

            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    } 

/*
    /**
     * Find in the database all the entities with a given state
     * @param state value to check
     * @returns array of elements or an exception
     */
 /*   findByState(state: boolean): AccountTypeEntity[] {

        try{ // try to find all entities with a given state

            const searchResult = this.database.filter(entity => entity.state === state); 
            
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Searchs in the DB all de account with a given name
     * @param name name of the account
     * @returns array of entities with that name or an exception
     */
 /*   findByName(name: string): AccountTypeEntity[] {

          try{ // try to find all entities of a given Name

            const searchResult = this.database.filter(entity => entity.name === name); //searchs for entities that matches the criteria
           
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        } 
    }

*/
    
}
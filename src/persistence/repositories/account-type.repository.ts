import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';

import { AccountTypeEntity } from "../entities";
import { BankInternalControl } from "./base";
import { AccountTypeRepositoryInterface } from "./interfaces";


@Injectable()
export class AccountTypeRepository extends BankInternalControl<AccountTypeEntity> implements AccountTypeRepositoryInterface{
    
   

    /**
     * Adds a new AccountType Entity to the Array of Accounts
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: AccountTypeEntity): AccountTypeEntity {
        
        try{ // try to add the entity to the array
            
            const res = this.database.push(entity);            
            return this.database.at(-1) ?? entity; // all good, returns the new entity 

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
           
            const targetEntityIndex = this.database.findIndex(entity => entity.id === id); //searchs for the position in the array of the entity with Id

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
           
            const targetEntityIndex = this.database.findIndex(entity => entity.id === id); //searchs for the position in the array of the entity with Id

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
     * @returns Array of entities 
     */
    findAll(): AccountTypeEntity[] {

        try{ 
        
            return this.database;

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

            const index = this.database.findIndex(entity => entity.id === id); //searchs for the position in the array of the entity with Id

            if(index == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }    

    /**
     * Find in the database all the entities with a given state
     * @param state value to check
     * @returns array of elements or an exception
     */
    findByState(state: boolean): AccountTypeEntity[] {

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
    findByName(name: string): AccountTypeEntity[] {

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


    /**
     * Search in the DB any value provided by the property given
     * @param property property where to find
     * @param value value to find
     * @returns array of entities or and exception
     */
    findBy(property: keyof AccountTypeEntity, value: string | number | boolean): AccountTypeEntity[] {
        
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
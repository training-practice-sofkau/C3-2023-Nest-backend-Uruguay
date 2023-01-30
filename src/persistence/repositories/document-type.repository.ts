import { Injectable } from '@nestjs/common/decorators';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';

import { DocumentTypeEntity } from '../entities';
import { BankInternalControl } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class DocumentTypeRepository extends BankInternalControl <DocumentTypeEntity> implements DocumentTypeRepositoryInterface{
    
    /**
     * Adds a new DocumentType entity to the Array of DocumentTypes
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        
        try{ // try to add the entity to the array
            
            const res = this.database.push(entity);            
            return this.database.at(-1) ?? entity; // all good, returns the new added entity 

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)
        }        
    }
    
    /**
     * Modify the data of the DocumentType that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        
        try{        
           
            const targetEntityIndex = this.findIndexById(id);
            
            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity, id: id} as DocumentTypeEntity; // update existing entity

            return this.database[targetEntityIndex]; // all good, returning update existing entity
            
        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
    }
    
    /**
     * Delete the DocumentType that matches a given Id
     * @param id unique key identifier
     * @param soft sets the deletion method to use (true = logical / false = permanent)
     */
    delete(id: string, soft?: boolean | undefined): void {
         
        try{        

            const targetEntityIndex = this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }  
            
            this.database.splice(targetEntityIndex); // Physical delete ( this entity hasn't logical delete )
        
        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
         }
    }
    
    /**
     * Returns the content of the array of DocumentTypes
     * @param paginator optional pagination to consider
     * @returns Array of entities 
     */
    findAll(paginator?: PaginationModel<DocumentTypeEntity>): DocumentTypeEntity[] {

        try{ 
        
            let result = this.database;

            if(paginator){
                let { offset = 0, limit = 0 } = paginator;
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
    findOneById(id: string): DocumentTypeEntity {

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
     * @param paginator optional pagination to consider         
     * @returns array of entities or and exception
     */
    findBy(property: keyof DocumentTypeEntity,
            value: string | number | boolean, 
            paginator?: PaginationModel<DocumentTypeEntity>): DocumentTypeEntity[] {
            
        try{ 

            let searchResult = this.database.filter(entity => entity[property] === value); //searchs for entities that matches the criteria
        
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            
            if (paginator) { // if there is a pagination provided
                let { offset = 0, limit = 0 } = paginator;
                searchResult = searchResult.slice(offset, offset + limit);
            }  

            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    } 


/*    /**
     * Find in the database all the entities with a given state
     * @param state value to check
     * @returns array of elements or an exception
     */
 /*   findByState(state: boolean): DocumentTypeEntity[] {

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
 /*   findByName(name: string): DocumentTypeEntity[] {
    
        try{ // try to find all entities of a given name

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
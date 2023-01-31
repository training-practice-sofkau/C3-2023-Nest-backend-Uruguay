import { Injectable } from "@nestjs/common/decorators";
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';

import { TransferEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from "./interfaces";
import { PaginationModel, DataRangeModel } from '../../../business/models';


@Injectable()
export class TransferRepository extends BankInternalControl<TransferEntity> implements RepositoryMethodsInterface<TransferEntity> {
    
    /**
     * Adds a new Transfer entity to the Array of tranfers
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: TransferEntity): TransferEntity {

        try{ // try to add the entity to the array
            
            this.database.push(entity);
            
            return this.database.at(-1) ?? entity; // all good, returns the new entity 

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)

        }
    }

    /**
     * Modify the data of the Transfer that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: TransferEntity): TransferEntity {

        try{                   
            const targetEntityIndex = this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity, id: id} as TransferEntity; // update existing entity
            return this.database[targetEntityIndex]; // all good, returning update existing entity

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
    }

    /**
     * Delete the Transfer that matches a given Id
     * @param id unique key identifier
     * @param soft sets the deletion method to use (true = logical / false = permanent)
     */
    delete(id: string, soft?: boolean | undefined): void {
        
        try{        
        
            const targetEntityIndex = this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }  
            
            if(typeof soft === undefined || soft === true){ // check if is a Logical Deletion

                    this.softDelete(targetEntityIndex); // calls the internal soft delete method

            }
            else if(typeof soft !== undefined || soft === false){ // checks if is Physical Deletion

                this.hardDelete(targetEntityIndex); // calls the internal hard delete method
                
            }

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error

        }
    }

    /**
     * Deletes physically the entity in the position of the given index
     * @param index index of the entity to delete
     */
    private hardDelete(index: number): void {

        try{

            this.database.splice(index);

        } catch(err){ // something went wrong

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Marks the entity in the index position as deleted (adds a timestamp in the deletedAt field)
     * @param index index of the entity to delete logicaly
     */
    private softDelete(index: number): void {

        try{

            this.database[index] = {...this.database[index], deletedAt: new Date()};

        } catch(err){ // something went wrong

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
    }

    /**
     * Returns the content of the array of Transfers
     * excludes the mark as deleted     
     * @param pagination optional pagination to be consider
     * @returns Array of entities  
     */
    findAll(pagination?: PaginationModel<TransferEntity>): TransferEntity[] {
                
        try{ 
        
            let result = this.database.filter( entity => typeof entity.deletedAt === undefined); //applies filter for deleted ones
            
            if( result.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); 
            }

            if (pagination) { // if there is a pagination provided
                let { offset = 0, limit = 0 } = pagination;
                result = result.slice(offset, offset + limit);
            }  
    
            return result; // all good, return the array 

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }
    

    /**
     * Search in the array for an entity that matches the Id provided
     * @param id unique key identifier 
     * @returns entity that matches the Id, if not present, it gives an NotFoundException
     */
    findOneById(id: string): TransferEntity {

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

            const index = this.database.findIndex(entity => entity.id === id 
                            && typeof entity.deletedAt === undefined ) ; 

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
     * @param dataRange dataRange to filter for
     * @returns array of entities or and exception
     */
    findBy(property: keyof TransferEntity, 
        value: string | number | boolean, 
        pagination?: PaginationModel<TransferEntity>, 
        dataRange?: DataRangeModel): TransferEntity[] {
            
        try{ 

            let searchResult = this.database.filter(entity => entity[property] === value); //searchs for entities that matches the criteria
            
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); 
            }

            if(dataRange && dataRange.start == typeof Date && dataRange.end == typeof Date){ //if there is a range provided
                searchResult = searchResult.filter( account => account.dateTime >= dataRange.start && account.dateTime <= dataRange.end)
            }
        
            if (pagination) { // if there is a pagination provided
            let { offset = 0, limit = 0 } = pagination;
            searchResult = searchResult.slice(offset, offset + limit);
            }  

            return searchResult; // all good, return the array 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }


/*
    /**
     * Searchs in the DB all the transfers from an origin account between two dates
     * @param accountId origin account unique key identifier
     * @param dateInit start date
     * @param dateEnd  end date
     * @returns array of entities or an exception
     */
 /*   findOutcomeByDateRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {

        try{ // try to find all entities that matches the date range by outcome ( origin account )

            const searchResult = this.database.filter(entity => entity.outcome === accountId 
                && entity.dateTime >= dateInit 
                && entity.dateTime <= dateEnd
                && typeof entity.deletedAt === undefined ) ; 

            if(searchResult.length <= 0){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the array of entities 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    /**
     * Searchs in the DB all the transfers to a destination account between two dates
     * @param accountId destination account unique key identifier
     * @param dateInit start date
     * @param dateEnd end date
     * @returns array of entities or an exception
     */
  /*  findIncomeByDateRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): TransferEntity[] {

        try{ // try to find all entities that matches the date range by income ( destination account )

            const searchResult = this.database.filter(entity => entity.income === accountId 
                && entity.dateTime >= dateInit 
                && entity.dateTime <= dateEnd
                && typeof entity.deletedAt === undefined ) ; 

            if(searchResult.length <= 0){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the array of entities 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }*/
    
}
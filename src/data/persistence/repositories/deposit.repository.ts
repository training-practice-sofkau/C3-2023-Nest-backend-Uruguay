import { Injectable } from '@nestjs/common/decorators';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';

import { DepositEntity } from '../entities';
import { BankInternalControl } from './base';
import { DepositRepositoryInterface } from './interfaces';
import { DataRangeModel, PaginationModel } from '../../../business/models';

@Injectable()
export class DepositRepository extends BankInternalControl<DepositEntity> implements DepositRepositoryInterface {
    
    /**
     * Adds a new Deposit entity to the Array of deposits
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: DepositEntity): DepositEntity {

        try{ // try to add the entity to the array
            
            this.database.push(entity);
            
            return this.database.at(-1) ?? entity; // all good, returns the new entity 

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)

        }
    }
    
    /**
     * Modify the data of the Deposit that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: DepositEntity): DepositEntity {

        try{                   
            const targetEntityIndex = this.findIndexById(id);

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity, id: id} as DepositEntity; // update existing entity

            return this.database[targetEntityIndex]; // all good, returning update existing entity

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
    }
    
    /**
     * Delete the Deposit that matches a given Id
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

            throw new InternalServerErrorException(`no encontrado Internal Error! (${err})`) // throws an internal Error

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
     * Returns the content of the array of Deposits    
     * excludes the mark as deleted
     * @param pagination optional pagination to be consider
     * @returns Array of entities  
     */
    findAll(pagination?: PaginationModel<DepositEntity>): DepositEntity[] {
                
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
    findOneById(id: string): DepositEntity {

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

            const index = this.database.findIndex(deposit => deposit.id === id 
                            && typeof deposit.deletedAt === 'undefined' ) ; 

            if(index == -1) { throw new NotFoundException(); }

            return index; 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }

    
    /**
     * Searchs in the DB for the Deposits matching an AccountID
     * @param accountId account unique key identifier
     * @returns array of entities or an exception
     */
    findByAccountId(accountId: string): DepositEntity[] {

        try{ // try to find all entities that matches a Account Id

            const searchResult = this.database.filter(entity => entity.accountId === accountId
                 && typeof entity.deletedAt === undefined ) ; //searchs for the matches
           
            if(searchResult.length <= 0){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the array of entities 

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
    findBy(property: keyof DepositEntity, 
        value: string | number | boolean, 
        pagination?: PaginationModel<DepositEntity>, 
        dataRange?: DataRangeModel): DepositEntity[] {
            
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
     * Searchs in the DB for Deposits made between dates
     * @param dateInit start date 
     * @param dateEnd  end date
     * @returns array of entities or and exception
     */
/*    findByDataRange(accountId: string, dateInit: Date | number, dateEnd: Date | number): DepositEntity[] {
        
        try{ // try to find all entities that matches date range

            const searchResult = this.database.filter(entity => entity.accountId === accountId
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
     * Search in the DB any value provided by the property given
     * @param property property where to find
     * @param value value to find
     * @returns array of entities or and exception
     */
 /*   findBy(property: keyof DepositEntity, value: string | number | boolean): DepositEntity[] {
                
        try{ 

            const searchResult = this.database.filter(entity => entity[property] === value); //searchs for entities that matches the criteria
           
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }
            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }*/
}
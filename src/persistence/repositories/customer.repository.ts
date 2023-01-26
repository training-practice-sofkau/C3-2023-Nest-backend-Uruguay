import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

import { CustomerEntity } from '../entities';
import { BankInternalControl } from './base';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class CustomerRepository extends BankInternalControl<CustomerEntity> implements RepositoryMethodsInterface<CustomerEntity> {

    /**
     * Adds a new Customer entity to the Array of customer
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: CustomerEntity): CustomerEntity {

        try{ // try to add the entity to the array
            
            const res = this.database.push(entity);
            
            if(res < 0 ){ //push didn't return new array lenght (something wrong happened)
                throw new Error("Error creating new Customer!");                
            }
            
            return entity; // all good, the new entity was created

        } catch (err){ // something went wrong, push didn't work

            throw new InternalServerErrorException(`Internal Error! (${err})`)

        }
    }

    /**
     * Modify the data of the Customer that matches a given Id
     * @param id unique key identifier
     * @param entity object that provides the new updated data 
     */
    update(id: string, entity: CustomerEntity): CustomerEntity {

        try{        
           
            const targetEntityIndex = this.database.findIndex(data => data.id === id); //searchs for the position in the array of the entity with Id

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity}; // update existing entity

            return this.database[targetEntityIndex]; // all good, returning update existing entity
            

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error

        }        
    }

    /**
     * Delete the Customer that matches a given Id
     * @param id unique key identifier
     * @param soft sets the deletion method to use (true = logical / false = permanent)
     */
    delete(id: string, soft?: boolean | undefined): void {
        
        try{        
           
            const targetEntityIndex = this.database.findIndex(data => data.id === id); //searchs for the position in the array of the entity with Id

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }  
            
            if(typeof soft === undefined || soft === true){

                    //TODO: Logical Delete

            }
            else if(typeof soft !== undefined || soft === false){

                //TODO: Permanent Delete
                
            }

        } catch (err){// something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error

        }
    }

    /**
     * Returns the content of the array of Customers
     * @returns Array of entities 
     */
    findAll(): CustomerEntity[] {
                
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
    findOneById(id: string): CustomerEntity {

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
}
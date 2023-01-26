import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common/decorators';


import { CustomerEntity } from '../entities';
import { BankInternalControl } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository extends BankInternalControl<CustomerEntity> implements CustomerRepositoryInterface {

    /**
     * Adds a new Customer entity to the Array of customer
     * @param entity new object to be inserted in the array
     * @returns new entity added
     */
    register(entity: CustomerEntity): CustomerEntity {

        try{ // try to add the entity to the array
            
            this.database.push(entity);
            
            return this.database.at(-1) ?? entity; // all good, returns the new entity 

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
           
            const targetEntityIndex = this.database.findIndex(entity => entity.id === id && typeof entity.deletedAt === undefined); //searchs for the position in the array of the entity with Id

            if(targetEntityIndex == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            this.database[targetEntityIndex] = {...this.database[targetEntityIndex], ...entity, id: id} as CustomerEntity; // update existing entity

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
           
            const targetEntityIndex = this.database.findIndex(entity => entity.id === id
                && typeof entity.deletedAt === undefined); //searchs for the position in the array of the entity with Id

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
     * Returns the content of the array of Customers
     * excludes the mark as deleted
     * @returns Array of entities 
     */
    findAll(): CustomerEntity[] {
                
        try{ 
        
            return this.database.filter( entity => typeof entity.deletedAt === undefined); //applies filter for deleted ones

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

            const index = this.database.findIndex(entity => entity.id === id && typeof entity.deletedAt === undefined ) ; //searchs for the position in the array of the entity with Id

            if(index == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
    }  

    /**
     * search in the DB for an active Customer with the combination of email and password
     * @param email email to find
     * @param password password to check
     * @returns true or false 
     */
    findOneByEmailAndPassword(email: string, password: string): boolean {

        const index = this.database.findIndex(entity => entity.email === email && 
            entity.password === password && typeof entity.deletedAt === undefined
        );

        return index == -1 ? false : true; // if the value returned is -1 the values dont have a match in the DB
      }
    

      /**
       *  Search the DB for an entity that matches a documentType and a document value
       * @param documentTypeId documentType to match
       * @param document document value
       * @returns an entity that matches the criteria or an exception
       */
      findOneByDocumentTypeAndDocument( documentTypeId: string, document: string ): CustomerEntity {

        try{ // try to find an entity with a given documentType and a document value

            const index = this.database.findIndex(entity => entity.documentType.id === documentTypeId 
                && entity.document === document && typeof entity.deletedAt === undefined ) ; //searchs for the position in the array of the entity with Id
           
            if(index == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
      }

      /**
       * Search the DB for an entity that matches the given email
       * @param email value to find
       * @returns an entity that matches the given value
       */
      findOneByEmail(email: string): CustomerEntity {

        try{ // try to find an entity with a given email

            const index = this.database.findIndex(entity => entity.email === email && typeof entity.deletedAt === undefined ) ; //searchs for the position in the array of the entity with Id
           
            if(index == -1){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return this.database[index]; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }        
      }

      /**
       * Searchs in the DB for an entity that matches the value given ( phone )
       * @param phone value to search for
       * @returns entity that matches the criteria or an exception
       */
      findOneByPhone(phone: string): CustomerEntity {
        
        try{ // try to find an entity with a given phone

            const index = this.database.findIndex(entity => entity.phone === phone && typeof entity.deletedAt === undefined ) ; //searchs for the position in the array of the entity with Id
           
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
      findByState(state: boolean): CustomerEntity[] {

        try{ // try to find all entities with a given state

            const searchResult = this.database.filter(entity => entity.state === state && typeof entity.deletedAt === undefined ); //searchs for the position in the array of the entity with Id
           
            if( searchResult.length <= 0){ // if the result of the search is empty
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the entity 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
      }

      /**
       * Search in the DB for all the entities that matches a given full name 
       * @param fullName value to search for
       * @returns an array of entities or an exception
       */
      findByFullName(fullName: string): CustomerEntity[] {

        try{ // try to find all entities that matches a given full name

            const searchResult = this.database.filter(entity => entity.fullname === fullName &&
                typeof entity.deletedAt === undefined ) ; //searchs for the matches
           
            if(searchResult.length <= 0){ // if the result of the search is an -1 (not found)
                throw new NotFoundException(); // gives and exception
            }

            return searchResult; // all good, return the array of entities 

        }catch(err){ // something wrong happened

            throw new InternalServerErrorException(`Internal Error! (${err})`) // throws an internal Error
        }
      }
}
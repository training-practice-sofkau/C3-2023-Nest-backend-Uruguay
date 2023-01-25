import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { Base } from './base/classAbstract';
import { InterfaceRepo } from './interfaces/InterfaceRepo';



@Injectable()
//Si implementamos InterfaceRepo con T como CustomerEntity creamos el registrer de tipo
// CustomerEntity haciendo uso de implements InterfaceRepo<CustomerEntity> luego de la class

export class CustomerRepository extends Base<CustomerEntity>{

  
 
}
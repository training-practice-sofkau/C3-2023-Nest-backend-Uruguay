import { Injectable } from '@nestjs/common/decorators';
import { CustomerEntity } from '../../entities/customer.entity';


@Injectable()
export class CustomerRepository{

    private readonly database: Array<CustomerEntity>;

    constructor(){
        this.database = new Array<CustomerEntity>();
    }
}
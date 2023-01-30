import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { CustomerEntity } from './customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService ){}
    
    @Post()
    async createCustomer(@Body() customer : CustomerDto){
        return this.customerService.createCustomer(customer);
    }

    @Put(`update/:id`)
    async updatedCustomer(@Param(`id`) id : string,@Body() newCustomer : CustomerDto):CustomerEntity{
        return this.customerService.updatedCustomer(id,newCustomer);
    }







}

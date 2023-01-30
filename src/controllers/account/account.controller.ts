import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { constructor } from 'express';
import { CustomerDto } from 'src/dtos/customer-dto';
import { CustomerEntity } from 'src/persistence/entities/customer-entity';
import { CustomerService } from 'src/services/customer/customer.service';

@Controller('account')
export class AccountController {}



constructor(private readonly customerService : CustomerService ){}
    
@Post()
async createCustomer(@Body() customer : CustomerDto){
    return this.customerService.createCustomer(customer);
}

@Put(`update/:id`)
async updatedCustomer(@Param(`id`) id : string,@Body() newCustomer : CustomerDto):CustomerEntity{
    return this.customerService.updatedCustomer(id,newCustomer);
}

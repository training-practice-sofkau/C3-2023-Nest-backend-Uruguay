import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { CustomerEntity } from './customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService ){}

    @Delete(`deleteCustomerSof/:id/:soft`)
    deleteCustomerSof(@Param(`id`)customerId: string,
    @Param(`soft`) soft?: boolean): void {
        return this.customerService.deleteCustomer(customerId,soft);
    }
    
    @Delete(`deleteCustomerHard/:id`)
    deleteCustomerHard(@Param(`id`)customerId: string): void {
        return this.customerService.deleteCustomer(customerId);

    }

    @Put(`changeState/:customerId/:state`)
    changeState(@Param(`customerId`)customerId: string ,
    @Param(`state`)state: boolean): void {
        return this.customerService.changeState(customerId,state);
    }



    @Get(`unsubscribe/:id`)
    unsubscribe(@Param(`id`) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }

    @Get(`all`)//Hay que pasarle por parametro con pagination
    findAll(): CustomerEntity[] {
        return this.customerService.findAll();
    }

    
    @Get(`getCustomer/:id`)
    getCustomerInfo(@Param(`id`) customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }

    
    @Post()
    createCustomer(@Body() customer : CustomerDto){
        return this.customerService.createCustomer(customer);
    }

    @Put(`update/:id`)
    updatedCustomer(@Param(`id`) id : string,
    @Body() newCustomer : CustomerDto)
    :CustomerEntity{
        return this.customerService.updatedCustomer(id,newCustomer);
    }







}

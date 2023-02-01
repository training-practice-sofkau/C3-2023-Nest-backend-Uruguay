import { Body, Controller, Delete, Get, Param, Post, Put, ParseUUIDPipe } from '@nestjs/common';

import { CustomerService } from 'src/business/services';
import { CustomerEntity } from 'src/data/persistence/entities';
import { UpdateCustomerDto } from 'src/business/dtos';

@Controller('customer')
export class CustomerController {

    constructor( private customerService: CustomerService) {}

    //TODO: Implment checks and controls - Verify user token
   

    //update account    
    @Put('update/:id')
    async updateAccount(@Param('id') customerId: string, 
                        @Body() newDetails: UpdateCustomerDto): 
                        Promise<CustomerEntity>{
    
        return await this.customerService.updatedCustomer(customerId, newDetails);
    }    

    // Get list of customers
    @Get()
    async getCustomers() : Promise<CustomerEntity[]>{
        return await this.customerService.getAll();
    }
    // get customer information
    @Get('/:id')
    async getInformation(@Param('id', ParseUUIDPipe) customerId: string): Promise<CustomerEntity>{
        
        return await this.customerService.getCustomerInfo(customerId);        
    }

    // Unsuscribe customer
    @Post('unsubscribe/:id')
    async unsubscribeCustomer(@Param('id', ParseUUIDPipe) customerId: string): Promise<boolean>{

        return await this.customerService.unsubscribe(customerId);
    }

    // Suscribe customer
    @Post('subscribe/:id')
    async subscribeCustomer(@Param('id', ParseUUIDPipe) customerId: string): Promise<boolean>{

        return await this.customerService.subscribe(customerId);
    }

}

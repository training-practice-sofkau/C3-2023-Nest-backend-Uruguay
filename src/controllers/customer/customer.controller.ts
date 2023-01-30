import { Body, Controller, Delete, Get, Param, Post, Put, ParseUUIDPipe } from '@nestjs/common';

import { CustomerService } from '../../services';
import { CustomerEntity } from '../../persistence/entities';
import { UpdateCustomerDto } from '../../dtos';

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

    // get customer information
    @Get('/:id')
    async getInformation(@Param('id', ParseUUIDPipe) customerId: string): Promise<CustomerEntity>{
        
        return await this.customerService.getCustomerInfo(customerId);        
    }

    // Unsuscribe customer
    @Post('unsuscribe/:id')
    async unsubscribeCustomer(@Param('id', ParseUUIDPipe) customerId: string): Promise<boolean>{

        return await this.customerService.unsubscribe(customerId);
    }

    // Suscribe customer
    @Post('unsuscribe/:id')
    async subscribeCustomer(@Param('id', ParseUUIDPipe) customerId: string): Promise<boolean>{

        return await this.customerService.subscribe(customerId);
    }

}

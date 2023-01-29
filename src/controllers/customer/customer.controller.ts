import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CustomerService } from '../../services';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';

@Controller('customer')
export class CustomerController {

    constructor( private customerService: CustomerService) {}

    //TODO: Implment checks and controls - Verify user token
   

    //update account
    // TODO: implement customerUpdateDTO instead of customerModel
    @Put('update/:id')
    async updateAccount(@Param('id') customerId: string, 
                        @Body() newDetails: CustomerModel): 
                        Promise<CustomerEntity>{
    
        return await this.customerService.updatedCustomer(customerId, newDetails);
    }    

    // get customer information
    @Get('/:id')
    async getInformation(@Param('id') customerId: string): Promise<CustomerEntity>{
        
        return await this.customerService.getCustomerInfo(customerId);        
    }

    // Unsuscribe customer
    @Post('unsuscribe/:id')
    async unsubscribeCustomer(@Param('id') customerId: string): Promise<boolean>{

        return await this.customerService.unsubscribe(customerId);
    }

    // Suscribe customer
    @Post('unsuscribe/:id')
    async subscribeCustomer(@Param('id') customerId: string): Promise<boolean>{

        return await this.customerService.subscribe(customerId);
    }

}

import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../../business';
import { CustomerEntity, CustomerModel } from '../../../data';



@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('getCustomer/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }

    @Put('updateCustomer/:id')
    updatedCustomer(@Param('id', ParseUUIDPipe) id: string,@Body() customer: CustomerModel): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Post('unsubscribe/:id')
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }
}

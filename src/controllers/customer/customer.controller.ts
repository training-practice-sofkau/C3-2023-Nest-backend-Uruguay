import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerModel } from '../../models';
import { CustomerEntity } from '../../persistence/entities';
import { CustomerService } from '../../services/customer';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('getCustomer/:id')
    getCustomerInfo(@Param('id') customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }

    @Put('updateCustomer/:id')
    updatedCustomer(@Body() @Param('id') id: string, customer: CustomerModel): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Post('unsubscribe/:id')
    unsubscribe(@Param('id') id: string): boolean {
        return this.customerService.unsubscribe(id);
    }
}

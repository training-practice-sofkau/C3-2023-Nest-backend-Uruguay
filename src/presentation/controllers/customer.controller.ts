import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from '../../business/services/customer.service';
import { UpdateCustomerDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CustomerEntity } from '../../data/persistence';

@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get('/get-customer')
    getCustomerInfo(@Query('customer') customer: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customer)
    }

    @Post('/update-customer')
    updatedCustomer(@Body() customer: UpdateCustomerDto) {
        return this.customerService.updatedCustomer(customer)
    }

    @Get('/unsuscribe')
    unsubscribe(@Query('customer') customer: string): boolean {
        return this.customerService.unsubscribe(customer);
    }
}

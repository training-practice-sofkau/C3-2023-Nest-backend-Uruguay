import { Body, Controller, Post, Query } from '@nestjs/common';
import { CustomerService } from '../../business/services/customer.service';
import { UpdateCustomerDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('/get-customer')
    getCustomerInfo(@Query('customer') customer: string) {
        return this.customerService.getCustomerInfo(customer)
    }

    @Post('/update-customer')
    updatedCustomer(@Body() customer: UpdateCustomerDto) {
        return this.customerService.updatedCustomer(customer)
    }

    @Post('/unsuscribe')
    unsubscribe(@Query('customer') customer: string): string {
        return this.customerService.unsubscribe(customer).toString();
    }
}

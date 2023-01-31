import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from '../../business/services/customer.service';
import { UpdateCustomerDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post('/get-customer')
    getCustomerInfo(@Body() customer: string): string {
        return this.customerService.getCustomerInfo(customer).toString();
    }

    @Post('/update-customer')
    updatedCustomer(@Body() customer: UpdateCustomerDto): string {
        return this.customerService.updatedCustomer(customer).toString();
    }

    @Post('/unsuscribe')
    unsubscribe(@Body() customer: string): string {
        return 'Not implemented';
    }
}

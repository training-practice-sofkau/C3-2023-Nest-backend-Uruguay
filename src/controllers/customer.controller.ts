import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { UpdateCustomerDto } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    getCustomerInfo(@Body() customer: string): string {
        return this.customerService.getCustomerInfo(customer).toString();
    }

    @Post()
    updatedCustomer(@Body() customer: UpdateCustomerDto): string {
        return this.customerService.updatedCustomer(customer).toString();
    }

    @Post()
    unsubscribe(@Body() customer: string): string {
        return 'Not implemented';
    }
}

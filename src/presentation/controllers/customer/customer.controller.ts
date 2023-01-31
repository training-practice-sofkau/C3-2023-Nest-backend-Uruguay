import { Body, UsePipes, Controller, Get, Post, Param, ParseUUIDPipe, ValidationPipe, Put, Patch, Delete } from '@nestjs/common';

import { CustomerService } from '../../../business/services';
import { PatchCustomerDto, CustomerDto } from '../../../business/dtos';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    findAll(): CustomerDto[] {
        return this.customerService.findAllCustomers();
    }

    @Get(':id')
    findOneCustomerById(@Param('id',ParseUUIDPipe) id: string ): CustomerDto {
        return this.customerService.getCustomerInfo(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createCustomer(@Body() customer: CustomerDto): CustomerDto {
        return this.customerService.createCustomer(customer);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateCustomer(@Param('id', ParseUUIDPipe) id: string ,@Body() customer: CustomerDto): CustomerDto {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateSomePropertiesCustomer(@Param('id', ParseUUIDPipe) id: string ,@Body() customer: PatchCustomerDto): CustomerDto {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Delete(':id/soft')
    softDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): void {
        this.customerService.softDeleteCustomer(id);
    }

    @Delete(':id')
    hardDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): void {
        this.customerService.deleteCustomer(id);
    }
}

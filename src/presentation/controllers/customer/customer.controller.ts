import { Body, UsePipes, Controller, Get, Post, Param, ParseUUIDPipe, ValidationPipe, Put, Patch, Delete } from '@nestjs/common';

import { CustomerService } from '../../../business/services';
import { UpdateCustomerDto, CustomerDto, DocumentTypeDto } from '../../../business/dtos';
import { DocumentTypeEntity, CustomerEntity } from '../../../data/persistence/entities/';
import { DocumentTypeRepository } from '../../../data/persistence/repositories';

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly documentTypeRepository: DocumentTypeRepository) {}

    @Get()
    findAll(): CustomerEntity[] {
        return this.customerService.findAllCustomers();
    }

    @Get(':id')
    findOneCustomerById(@Param('id',ParseUUIDPipe) id: string ): CustomerEntity {
        return this.customerService.getCustomerInfo(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateCustomer(@Param('id', ParseUUIDPipe) id: string ,@Body() customer: UpdateCustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateSomePropertiesCustomer(
        @Param('id', ParseUUIDPipe) id: string ,
        @Body() customer: UpdateCustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer);
    }

    @Patch(':id/soft')
    softDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): void {
        return this.customerService.softDeleteCustomer(id);
    }

    @Delete(':id')
    hardDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): void {
        this.customerService.deleteCustomer(id);
    }

    @Post('document/type')
    createDocumentType(@Body() documentType: DocumentTypeDto): DocumentTypeEntity {
        return this.customerService.createDocumentType(documentType);
    }

    @Patch(':id/unsuscribe')
    unsubscribeCustomer(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }
}

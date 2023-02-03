import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Put, Post } from '@nestjs/common';
import { CustomerDto } from "src/business/dtos/createCustomer.dto"
import { CustomerEntity, CustomerRepository, DocumentTypeEntity } from 'src/data/persistence';
import { AccountService, CustomerService } from "src/business/services"
import { DocumentTypeDto } from 'src/business/dtos/documentType.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get('/getCustomerInfo/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string): CustomerEntity {

        return this.customerService.getCustomerInfo(customerId)
    }

    @Put('/update/:id')
    updateCustomer(@Param('id') id: string, @Body() customer: CustomerDto): CustomerEntity {
        console.log(customer)
        return this.customerService.updatedCustomer(id, customer)
    }

    @Put('/unsubscribe/:id')
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id)
    }

    @Get('/getCustomers')
    getCustomers(): CustomerEntity[] {
        return this.customerService.getCustomers()
    }

    @Post('createDocumentType')
    createAccountType(@Body() documentType: DocumentTypeDto): DocumentTypeEntity {
    const NewAccountType = this.customerService.createDocumentType(documentType);
     return NewAccountType
    }

}
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CustomerService } from '../../business/services/customer.service';
import { PaginationDto, UpdateCustomerDto } from '../../business/dtos';
import { ApiTags } from '@nestjs/swagger';
import { CustomerEntity, DocumentTypeEntity } from '../../data/persistence';

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
    unsubscribe(@Query('customer') customer: string, @Query('soft') soft?: boolean): boolean {
        return this.customerService.unsubscribe(customer, soft);
    }

    @Get('/get-customers-by-state')
    findByState(@Query('state') state: boolean): CustomerEntity[] {
        return this.customerService.findByState(state);
    }

    @Get('/get-soft-deleteds')
    findSoftDeletedCustomers(): CustomerEntity[] {
        return this.customerService.findSoftDeletedCustomers();
    }

    @Get('/get-all')
    findAllCustomers(pagination?: PaginationDto): CustomerEntity[] {
        return this.customerService.findAllCustomers(pagination);
    }

    @Get('/get-all-document-types')
    findAllDocumentTypes(pagination?: PaginationDto): DocumentTypeEntity[] {
        return this.customerService.findAllDocumentTypes(pagination);
    }
}

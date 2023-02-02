import { Body, Controller, Param, Post, Put, Delete, Get, Patch } from '@nestjs/common';
import { CustomerService } from 'src/business/services';
import { PaginationModel } from 'src/data/models';
import { CustomerEntity } from 'src/data/persistence';
import { UpdateCustomerDTO, TypeDTO } from 'src/business/dtos';
import { DocumentTypeEntity } from '../../../data/persistence/entities/document-type.entity';
import { CustomerStateDTO } from 'src/business/dtos/customer-state.dto';


@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Put('/update/:id')
    updateCustomer(@Param('id') id: string ,@Body() newCustomer: UpdateCustomerDTO): CustomerEntity {
        return this.customerService.updatedCustomer(id, newCustomer);
    }

    @Delete('/soft-delete/:id')
    unsuscribe(@Param('id') id: string): void {
        this.customerService.deleteCustomer(id);
    }
    @Delete('/hard-delete/:id')
    hardDelete(@Param('id') id: string): void {
        this.customerService.deleteCustomer(id);
    }

    @Get('/find/:id')
    getCustomerInfo(@Param('id') id: string) {
        return this.customerService.getCustomerInfo(id);
    }

    @Get('/find-all')
    findAll(pagination: PaginationModel): CustomerEntity[] {
        return this.customerService.findAll(pagination);
    }

    @Get('/document-type/find-all')
    findAllDocumentTypes(pagination: PaginationModel): DocumentTypeEntity[] {
        return this.customerService.findAllDocumentTypes(pagination);
    }

    @Get('/document-type/:id')
    findDocumentType(@Param('id') id: string): DocumentTypeEntity {
        return this.customerService.findDocumentType(id);
    }

    @Patch('/change-state/:id')
    changeState(@Param('id') id: string): void {
        this.customerService.changeState(id);
    }
}

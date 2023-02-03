import { Query, ParseBoolPipe, Body, UsePipes, Controller, Get, Post, Param, ParseUUIDPipe, ValidationPipe, Put, Patch, Delete } from '@nestjs/common';

import { CustomerService } from '../../../business/services';
import { UpdateCustomerDto, DocumentTypeDto, PaginationDto } from '../../../business/dtos';
import { DocumentTypeEntity, CustomerEntity } from '../../../data/persistence/entities/';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @UsePipes(new ValidationPipe())
    findAll(@Query() paginaton?: PaginationDto|undefined): CustomerEntity[] {
        return this.customerService.findAllCustomers(paginaton);
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
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
    @UsePipes(new ValidationPipe())
    softDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): string {
        return this.customerService.softDeleteCustomer(id);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    hardDeleteCustomer(@Param('id', ParseUUIDPipe) id: string): string {
        return this.customerService.deleteCustomer(id);
    }

    
    @Patch(':id/unsuscribe')
    @UsePipes(new ValidationPipe())
    unsubscribeCustomer(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }
    
    @Patch(':id/state/:bool')
    @UsePipes(new ValidationPipe())
    changeStateCustomer(
        @Param('id', ParseUUIDPipe) id: string,
        @Param('bool', ParseBoolPipe) bool: boolean): void {
        this.customerService.changeState(id, bool);
    }
    
    @Get('email/:email/password/:password')
    findCustomerByEmailAndPassword(
        @Param('email') email: string,
        @Param('password') password: string): boolean {
            return this.customerService.findOneByEmailAndPassword(email, password);
    }
        
    @Get('type/:type/document/:document')
    findCustomerByDocumentTypeAndDocument(
        @Param('type') type: string,
        @Param('document') document: string): CustomerEntity {
            return this.customerService.findOneByDocumentTypeAndDocument(type, document);
    }
    
    @Get('email/:email')
    findCustomerByEmail(@Param('email') email: string): CustomerEntity {
        return this.customerService.findOneByEmail(email);
    }
    
    @Get('phone/:phone')
    findCustomerByPhone(@Param('phone') phone: string): CustomerEntity {
        return this.customerService.findOneByPhone(phone);
    }
        
    @Get('state/:state')
    @UsePipes(new ValidationPipe())
    findCustomerByState(@Param('state', ParseBoolPipe) state: boolean): CustomerEntity[] {
        return this.customerService.findByState(state);
    }
    
    @Get('fullname/:fullname')
    findCustomerByFullName(@Param('fullname') fullname: string): CustomerEntity[] {
        return this.customerService.findByFullName(fullname);
    }

    @Post('document/type')
    @UsePipes(new ValidationPipe())
    createDocumentType(@Body() documentType: DocumentTypeDto): DocumentTypeEntity {
        return this.customerService.createDocumentType(documentType);
    }

    @Put('document/type/:id')
    @UsePipes(new ValidationPipe())
    updateDocumentType(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() edit: DocumentTypeDto): DocumentTypeEntity {
            return this.customerService.updateDocumentType(id, edit);
    }
    
    @Patch('document/type/:id')
    @UsePipes(new ValidationPipe())
    updateSomePropertiesDocumentType(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() edit: DocumentTypeDto): DocumentTypeEntity {
            return this.customerService.updateDocumentType(id, edit);
    }

    @Delete('document/type/:id')
    @UsePipes(new ValidationPipe())
    deleteDocumentType(@Param('id', ParseUUIDPipe) id: string): string {
        return this.customerService.deleteDocumentType(id);
    }

    @Get('document/type')
    getAllDocumentType(): DocumentTypeEntity[] {
        return this.customerService.findAllDocumentType();
    }
    @Get('document/type/:id')
    @UsePipes(new ValidationPipe())
    getOneDocumentType(@Param('id', ParseUUIDPipe) id: string): DocumentTypeEntity {
        return this.customerService.findOneDocumentType(id);
    }

    @Get('document/type/state/:state')
    @UsePipes(new ValidationPipe())
    getDocumentTypesByState(@Param('state', ParseBoolPipe) state: boolean): DocumentTypeEntity[] {
        return this.customerService.findDocumentTypesByState(state);
    }

    @Get('document/type/name/:name')
    @UsePipes(new ValidationPipe())
    getDocumentTypesByName(@Param('name') name: string): DocumentTypeEntity[] {
        return this.customerService.findDocumentTypesByName(name);
    }
}

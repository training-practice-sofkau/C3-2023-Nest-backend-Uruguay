import { Body, Controller, Param, Post, Put, Delete, Get, Patch } from '@nestjs/common';
import { CreateCustomerDto } from 'src/data-access/dtos/create-customer-dto';
import { UpdateCustomerDTO } from 'src/data-access/dtos/update-customer-dto';
import { PaginationModel } from 'src/data-access/models/i-pagination-model';
import { CustomerEntity } from 'src/data-access/entities/customer-entity';
import { CustomerService } from 'src/business-logic/services/customer/customer.service';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService : CustomerService ){}

    @Put('/update/:id')
    updateCustomer(@Param() id: string ,@Body() newCustomer: UpdateCustomerDTO ): CustomerEntity {
        return this.customerService.updatedCustomer(id, newCustomer);
    }

    @Delete('/softdelete/:id')
    unsuscribe(id: string): void {
        this.customerService.deleteCustomer(id);
    }
    @Delete('/harddelete/:id')
    hardDelete(id: string): void {
        this.customerService.deleteCustomer(id);
    }

    @Get('/find/:id')
    getCustomerInfo(@Param() id: string) {
        return this.customerService.getCustomerInfo(id);
    }

    @Get('/find-all')
    findAll(pagination: PaginationModel): CustomerEntity[] {
        return this.customerService.findAll(pagination);
    }

    @Patch('/change-state/:id')
    changeState(@Param() id: string, @Body() state: boolean): void {
        this.customerService.changeState(id, state);
    }

}

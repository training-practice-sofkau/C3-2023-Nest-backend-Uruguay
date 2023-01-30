import { Body, Controller, Param, Post, Put, Delete, Get, Patch } from '@nestjs/common';
import { CustomerService } from '../../services/customer/';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../../dtos/';
import { CustomerEntity } from '../../persistence/entities/';
import { PaginationModel } from 'src/models';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Put('/update/:id')
    updateCustomer(@Param() id: string ,@Body() newCustomer: UpdateCustomerDTO): CustomerEntity {
        return this.customerService.updatedCustomer(id, newCustomer);
    }

    @Delete('/soft-delete/:id')
    unsuscribe(id: string): void {
        this.customerService.deleteCustomer(id);
    }
    @Delete('/hard-delete/:id')
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

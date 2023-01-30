import { Body, Controller, Param, Post, Put, Delete } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CreateCustomerDTO } from '../../dtos/create-customer.dto';
import { CustomerEntity } from '../../persistence/entities/customer.entity';
import { PaginationModel } from '../../../dist/models/pagination-model.model';
import { UpdateCustomerDTO } from '../../dtos/update-customer.dto';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    @Post()
    createCustomer(customer: CreateCustomerDTO): CustomerEntity {
        return this.customerService.createCustomer(customer);
    }

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
}

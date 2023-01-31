import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerDto } from '../../dtos/customer.dto';
import { CustomerEntity } from '../../persistence/entities/customer.entity';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get("info/:id")
    getCustomerInfo(@Param("id") customerId: string):CustomerEntity {
        return this.customerService.getCustomerInfo(customerId)
    }

    @Patch("update")
    updateCustomer(@Body() id: string, customer: CustomerDto):CustomerEntity {
        return this.customerService.updatedCustomer(id, customer)
    }

    @Patch("delete/:id")
    unsubscribe(@Param("id") id: string):void {
        this.customerService.unsubscribe(id)
    }
}

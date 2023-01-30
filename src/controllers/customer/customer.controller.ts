import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerDto } from '../../dtos/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Patch("update")
    updateCustomer(@Body() id: string, customer: CustomerDto) {
        return this.customerService.updatedCustomer(id,customer)
    }

    @Patch("delete/:id")
    unsubscribe(@Param("id") id:string){
        this.customerService.unsubscribe(id)
    }
}

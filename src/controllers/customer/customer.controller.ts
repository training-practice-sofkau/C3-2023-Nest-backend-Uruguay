import { Body, Controller, Get, Param, ParseUUIDPipe, Patch ,Put } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerDto } from '../../dtos/customer.dto';
import { CustomerEntity } from 'src/persistence';

@Controller('customer')
export class CustomerController {
    constructor (private readonly customerService : CustomerService) {}

    @Get()
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string ): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId)
    }
    
    @Put()
    updateCustomer(@Param('id', ParseUUIDPipe) id: string, @Body() customer: CustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer)
    }
    
    @Patch()
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id)
    }

      }


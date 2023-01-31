import { Body, Controller, Get, Param, ParseUUIDPipe, Patch ,Put } from '@nestjs/common';
import { CustomerEntity } from 'src/Capa-Data/persistence';
import { CustomerService } from 'src/Capa-Negocio/services';

import { CustomerDto } from '../../dtos/customer.dto';


@Controller('customer')
export class CustomerController {
    constructor (private readonly customerService : CustomerService) {}

    @Get('/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string ): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId)
    }
    
    @Put('/:id')
    updateCustomer(@Param('id', ParseUUIDPipe) id: string, @Body() customer: CustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer)
    }
    
    @Patch('/:id')
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id)
    }

      }


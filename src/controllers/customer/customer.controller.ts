import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Put } from "@nestjs/common"
import { CustomerDto } from "src/dtos/customer"
import { CustomerEntity } from "src/persistence"
import { CustomerService } from "src/services"

@Controller('customer')
export class CustomerController {
    constructor (private readonly customerService : CustomerService) {}

    @Get('/:id')
    getCustomerInfo(@Param('id', ParseUUIDPipe) customerId: string ): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId)
    }

    @Patch('/:id')
    updateCustomer(@Param('id') id: string, @Body() customer: CustomerDto): CustomerEntity {
        return this.customerService.updatedCustomer(id, customer)
    }

    @Put('/:id')
    unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
        return this.customerService.unsubscribe(id)
    }

      }


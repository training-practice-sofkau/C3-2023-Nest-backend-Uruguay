import { Controller, Get, Param, Put, Body, ParseUUIDPipe } from '@nestjs/common';
import { CustomerService, CustomerDtos } from 'src/business';
import { CustomerEntity } from 'src/Data';


@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}


  @Get(':customerId')
  getCustomerInfo(@Param('customerId') customerId: string): CustomerEntity {
    
    return this.customerService.getCustomerInfo(customerId);
  }

  @Put(':id')
  updatedCustomer(@Param('id', ParseUUIDPipe) id: string, @Body() customer: CustomerDtos): CustomerEntity {
    return this.customerService.updatedCustomer(id, customer);
  }

 
  @Put('unsubscribe/:id')
  unsubscribe(@Param('id', ParseUUIDPipe) id: string): boolean {
    return this.customerService.unsubscribe(id);
  }


}

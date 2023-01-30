import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerDto } from '../../dtos/customer.dto';
import { CustomerEntity } from 'src/persistence';

@Controller('customer')
export class CustomerController {
    constructor (private readonly customerService : CustomerService) {}

    @Post()
    getCustomerInfo(@Body() getCustomerInfo : CustomerDto): CustomerEntity {
        return this.customerService.getCustomerInfo(getCustomerInfo)
      }
  
   
    

      }


import { Module } from '@nestjs/common';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { CustomerService } from '../../services/customer/customer.service';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService],})
export class CustomerModule {}

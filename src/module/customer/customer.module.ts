import { Module } from '@nestjs/common';
import { CustomerService } from './service/customer.service';

import { CustomerController } from './controller/customer.controller';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CusotmerModule {}

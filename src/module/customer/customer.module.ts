import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CustomerController } from './customer.controller';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CusotmerModule {}

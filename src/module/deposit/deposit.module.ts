import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { DepositRepository } from './deposit.repository';

@Module({
    imports: [],
    controllers: [DepositController],
    providers: [DepositService,DepositRepository]
})
export class DepositModule {}

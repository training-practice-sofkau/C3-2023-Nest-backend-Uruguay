import { Module } from '@nestjs/common';
import { DepositController } from '../../controllers/deposit/deposit.controller';
import { DepositService } from '../../services/deposit/deposit.service';

@Module({
    imports: [],
    controllers: [DepositController],
    providers: [DepositService],})
export class DepositModule {}

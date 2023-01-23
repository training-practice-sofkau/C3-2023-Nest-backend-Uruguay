import { Module } from '@nestjs/common';
import { TransferController } from '../../controllers/transfer/transfer.controller';
import { TransferService } from '../../services/transfer/transfer.service';

@Module({
    imports: [],
    controllers: [TransferController],
    providers: [TransferService],})
export class TransferModule {}

import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TransferRepository } from './transfer.repository';

@Module({
    imports: [],
    controllers: [TransferController],
    providers: [TransferService,TransferRepository]
})
export class TransferModule {}

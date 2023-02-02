import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferService } from '../../business/services';
import { CreateTransferDto, HistoryDto, PaginationDto } from '../../business/dtos';
import { TransferEntity } from '../../data/persistence';

@ApiTags('transfer')
@Controller('api/transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService) {}

    @Post('/create-transfer')
    createTransfer(@Body() transfer: CreateTransferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }
    
    @Get('/delete-transfer')
    deleteTransfer(@Query('transfer') transfer: string, @Query('soft') soft?: boolean): boolean {
        return this.transferService.deleteTransfer(transfer, soft);
    }
    
    @Post('/get-history')
    getHistory(@Body() history: HistoryDto): TransferEntity[] {
        return this.transferService.getHistory(history.id, history.pagination, history.datarange);
    }

    @Post('/get-history-out')
    getHistoryOut(@Body() history: HistoryDto): TransferEntity[] {
        return this.transferService.getHistoryOut(history.id, history.pagination, history.datarange);
    }

    @Post('/get-history-in')
    getHistoryIn(@Body() history: HistoryDto): TransferEntity[] {
        return this.transferService.getHistoryIn(history.id, history.pagination, history.datarange);
    }

    @Get('/get-soft-deleteds')
    findSoftDeletedTransfers(): TransferEntity[] {
        return this.transferService.findSoftDeletedTransfers();
    }

    @Get('/get-all')
    findAllTransfers(pagination?: PaginationDto): TransferEntity[] {
        return this.transferService.findAllTransfers();
    }
}

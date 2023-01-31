import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferService } from '../../business/services';
import { CreateTransferDto, HistoryDto, PaginationDto } from '../../business/dtos';

@ApiTags('transfer')
@Controller('api/transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService) {}

    @Post('/create-transfer')
    createTransfer(@Body() transfer: CreateTransferDto): string {
        return this.transferService.createTransfer(transfer).toString();
    }
    
    @Post('/delete-transfer')
    deleteTransfer(@Body() transfer: string): string {
        this.transferService.deleteTransfer(transfer);
        return 'ready';
    }
    
    @Post('/get-history')
    getHistory(@Body() account: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(account, pagination, dataRange).toString();
    }

    @Post('/get-history-out')
    getHistoryOut(@Body() accountOut: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(accountOut, pagination, dataRange).toString();
    }

    @Post('/get-history-in')
    getHistoryIn(@Body() accountIn: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(accountIn, pagination, dataRange).toString();
    }
}

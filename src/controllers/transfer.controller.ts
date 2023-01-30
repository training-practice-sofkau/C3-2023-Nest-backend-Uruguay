import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransferService } from '../services';
import { CreateTransferDto, HistoryDto, PaginationDto } from '../dtos';

@ApiTags('transfer')
@Controller('api/transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService) {}

    @Post()
    createTransfer(@Body() transfer: CreateTransferDto): string {
        return this.transferService.createTransfer(transfer).toString();
    }
    
    @Post()
    deleteTransfer(@Body() transfer: string): string {
        this.transferService.deleteTransfer(transfer);
        return 'ready';
    }
    
    @Post()
    getHistory(@Body() account: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(account, pagination, dataRange).toString();
    }

    @Post()
    getHistoryOut(@Body() accountOut: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(accountOut, pagination, dataRange).toString();
    }

    @Post()
    getHistoryIn(@Body() accountIn: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.transferService.getHistory(accountIn, pagination, dataRange).toString();
    }
}

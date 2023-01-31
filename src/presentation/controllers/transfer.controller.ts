import { Body, Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService, TransferService } from '../../business/services';
import { CreateTransferDto, HistoryDto, PaginationDto } from '../../business/dtos';
import { TransferEntity } from '../../data/persistence';

@ApiTags('transfer')
@Controller('api/transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService, private readonly accountService: AccountService) {}

    @Post('/create-transfer')
    createTransfer(@Body() transfer: CreateTransferDto) {
        const newTransfer = new TransferEntity();
        newTransfer.balance = transfer.balance;
        newTransfer.income = this.accountService.getAccountById(transfer.incomeId);
        newTransfer.outcome = this.accountService.getAccountById(transfer.outcomeId);
        newTransfer.reason = transfer.reason;
        newTransfer.dateTime = transfer.dateTime || Date.now(); 
        return this.transferService.createTransfer(newTransfer);
    }
    
    @Post('/delete-transfer')
    deleteTransfer(@Query('transfer') transfer: string): string {
        return this.transferService.deleteTransfer(transfer).toString();
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

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService, TransferService } from '../../business/services';
import { CreateTransferDto, HistoryDto } from '../../business/dtos';
import { TransferEntity } from '../../data/persistence';
import { BalanceDto } from '../../business/dtos/balance.dto';

@ApiTags('transfer')
@Controller('api/transfer')
export class TransferController {

    constructor(private readonly transferService: TransferService, private readonly accountService: AccountService) {}

    @Post('/create-transfer')
    createTransfer(@Body() transfer: CreateTransferDto) {
        const balance = new BalanceDto();
        balance.accountId = transfer.incomeId;
        balance.amount = transfer.balance;
        if (this.accountService.verifyAmountIntoBalance(balance)) {
            const newTransfer = new TransferEntity();
            newTransfer.balance = transfer.balance;
            newTransfer.income = this.accountService.getAccountById(transfer.incomeId);
            newTransfer.outcome = this.accountService.getAccountById(transfer.outcomeId);
            newTransfer.reason = transfer.reason;
            newTransfer.dateTime = transfer.dateTime || Date.now();
            this.accountService.removeBalance(balance);
            balance.accountId = transfer.outcomeId;
            this.accountService.addBalance(balance);
            return this.transferService.createTransfer(newTransfer);
        }
    }
    
    @Get('/delete-transfer')
    deleteTransfer(@Query('transfer') transfer: string): boolean {
        return this.transferService.deleteTransfer(transfer);
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
}

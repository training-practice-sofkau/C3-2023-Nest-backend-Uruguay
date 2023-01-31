import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService, DepositService } from '../../business/services';
import { CreateDepositDto, HistoryDto, PaginationDto } from '../../business/dtos';

@ApiTags('deposit')
@Controller('api/deposit')
export class DepositController {

    constructor(private readonly depositService: DepositService, private readonly accountService: AccountService) {}

    @Post('/create-deposit')
    createDeposit(@Body() deposit: CreateDepositDto): string {
        return this.depositService.createDeposit(deposit).toString();
    }
    
    @Post('/delete-deposit')
    deleteDeposit(@Body() deposit: string): string {
        this.depositService.deleteDeposit(deposit);
        return 'ready';
    }
    
    @Post('/get-history')
    getHistory(@Body() account: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.depositService.getHistory(account, pagination, dataRange).toString();
    }

}

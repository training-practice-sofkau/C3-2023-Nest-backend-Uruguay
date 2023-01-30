import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService, DepositService } from '../services';
import { CreateDepositDto, HistoryDto, PaginationDto } from '../dtos';

@ApiTags('deposit')
@Controller('api/deposit')
export class DepositController {

    constructor(private readonly depositService: DepositService, private readonly accountService: AccountService) {}

    @Post()
    createDeposit(@Body() deposit: CreateDepositDto): string {
        return this.depositService.createDeposit(deposit).toString();
    }
    
    @Post()
    deleteDeposit(@Body() deposit: string): string {
        this.depositService.deleteDeposit(deposit);
        return 'ready';
    }
    
    @Post()
    getHistory(@Body() account: string, pagination?: PaginationDto, dataRange?: HistoryDto): string {
        return this.depositService.getHistory(account, pagination, dataRange).toString();
    }

}

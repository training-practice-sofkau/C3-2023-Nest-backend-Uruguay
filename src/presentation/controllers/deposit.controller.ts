import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepositService } from '../../business/services';
import { CreateDepositDto, HistoryDto } from '../../business/dtos';
import { DepositEntity } from '../../data/persistence';

@ApiTags('deposit')
@Controller('api/deposit')
export class DepositController {

    constructor(private readonly depositService: DepositService) {}

    @Post('/create-deposit')
    createDeposit(@Body() deposit: CreateDepositDto) {
        return this.depositService.createDeposit(deposit);
    }
    
    @Get('/delete-deposit')
    deleteDeposit(@Query('deposit') deposit: string): boolean {
        return this.depositService.deleteDeposit(deposit);
    }
    
    @Post('/get-history')
    getHistory(@Body() history: HistoryDto): DepositEntity[] {
        return this.depositService.getHistory(history.id, history.pagination, history.datarange);
    }

}

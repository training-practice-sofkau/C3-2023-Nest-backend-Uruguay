import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { DepositService } from 'src/business/services';
import { DataRangeModel, PaginationModel } from 'src/data/models';
import { DepositEntity } from 'src/data/persistence';
import { CreateDepositDTO } from 'src/business/dtos/create-deposit.dto';
import { Logger } from '@nestjs/common/services';
;

@Controller('deposit')
export class DepositController {
    private logger = new Logger('DepositController');

    constructor(private readonly depositService: DepositService) {}

    @Post('/create')
    createDeposit(@Body() deposit: CreateDepositDTO): DepositEntity {
        this.depositService.depositObservable.subscribe(deposit => 
            this.logger.log(`New Deposit Account added to Customer: ${deposit.account.customer}`))
        return this.depositService.createDeposit(deposit);
    }

    @Get('/find-all')
    findAll(@Body() pagination: PaginationModel): DepositEntity[] {
        return this.depositService.findAll(pagination);
    }

    @Delete('/soft-delete/:id')
    softDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id, true);
    }

    @Delete('/hard-delete/:id')
    hardDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id);
    }

    @Get('/get-history/:id')
    getHistory(@Param('id') id: string, @Query('offset') offset: number, @Query('limit') limit?: number, @Body() dateRange?: DataRangeModel): DepositEntity[] {
        return this.depositService.getAccountHistory(id, offset, limit, dateRange);
    }

    
}

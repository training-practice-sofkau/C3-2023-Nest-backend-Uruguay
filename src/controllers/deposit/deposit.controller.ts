import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DepositService } from '../../services/deposit/deposit.service';
import { CreateDepositDTO } from '../../dtos/create-deposit.dto';
import { DepositEntity } from '../../persistence/entities/deposit.entity';
import { DataRangeModel, PaginationModel } from 'src/models';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Post('/create')
    createDeposit(@Body() deposit: CreateDepositDTO): DepositEntity {
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
    getHistory(@Param('id') id: string, @Body() pagination: PaginationModel, @Body() dateRange?: DataRangeModel): DepositEntity[] {
        return this.depositService.getAccountHistory(id, pagination, dateRange);
    }

    
}

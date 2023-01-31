import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateDepositDto } from '../../business/dtos';
import { DepositEntity } from '../../persistence';
import { DepositService } from '../../services';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) { }

    @Post('createDeposit')
    createDeposit(@Body() deposit: CreateDepositDto): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }

    @Delete('deleteDeposit/:id')
    deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string): void {
        this.depositService.deleteDeposit(depositId);
    }

    @Get('getHistory/:id')
    getHistory(@Param('id', ParseUUIDPipe) depositId: string): DepositEntity[] {
        return this.depositService.getHistory(depositId);
    } 
}


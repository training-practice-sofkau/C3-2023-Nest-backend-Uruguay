import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { DepositService, CreateDepositDto } from '../../../business';
import { DepositEntity } from '../../../data';



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


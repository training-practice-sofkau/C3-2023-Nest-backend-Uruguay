import { Controller, Get, Param, UsePipes, ValidationPipe, ParseUUIDPipe, Post, Body, Delete, Put } from '@nestjs/common';

import { DepositEntity } from '../../persistence/entities';
import { DepositService } from '../../services';
import { DepositDto } from '../../dtos';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Get('account/:id')
    @UsePipes(new ValidationPipe())
    getDeposits(@Param('id', ParseUUIDPipe) id: string): DepositEntity[] {
        return this.depositService.getHistory(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    postDeposit(@Body() deposit: DepositDto): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    putDeposit(@Param('id', ParseUUIDPipe) id: string, @Body() newdDeposit: DepositDto): DepositEntity {
        return this.depositService.updateDeposit(id, newdDeposit);
    }

    @Delete(':id')
    deleteDepositById(@Param('id', ParseUUIDPipe) id: string): void {
        this.depositService.deleteDeposit(id);
    }
}

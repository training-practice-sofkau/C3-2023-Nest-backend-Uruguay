import { Controller, Get, Param, UsePipes, ValidationPipe, ParseUUIDPipe, Post, Body, Delete, Put, Patch } from '@nestjs/common';

import { DepositEntity } from '../../../data/persistence/entities';
import { DepositService } from '../../../business/services';
import { DepositDto } from '../../../business/dtos';

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
    updateDeposit(@Param('id', ParseUUIDPipe) id: string, @Body() newdDeposit: DepositDto): DepositEntity {
        return this.depositService.updateDeposit(id, newdDeposit);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateDepositSomeProperties(@Param('id', ParseUUIDPipe) id: string, @Body() newdDeposit: DepositDto): DepositEntity {
        return this.depositService.updateDeposit(id, newdDeposit);
    }

    @Patch(':id/soft')
    softDeleteDeposit(@Param('id', ParseUUIDPipe) id: string): void {
        this.depositService.softDeleteDeposit(id);
    }

    @Delete(':id')
    hardDeleteDeposit(@Param('id', ParseUUIDPipe) id: string): void {
        this.depositService.deleteDeposit(id);
    }
}

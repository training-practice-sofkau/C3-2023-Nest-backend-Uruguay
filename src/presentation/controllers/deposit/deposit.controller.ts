import { Controller, Get, Param, UsePipes, ValidationPipe, ParseUUIDPipe, Post, Body, Delete, Put, Patch, Query, ParseIntPipe } from '@nestjs/common';

import { DepositEntity } from '../../../data/persistence/entities';
import { DepositService } from '../../../business/services';
import { PaginationDto, DataRangeDto, DepositDto } from '../../../business/dtos';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Get('account/:id')
    @UsePipes(new ValidationPipe())
    getDepositsAccount(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() datarange: DataRangeDto|undefined,
        @Query() pagination: PaginationDto|undefined): DepositEntity[] {
            return this.depositService.getHistory(id, pagination, datarange);
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
    @UsePipes(new ValidationPipe())
    softDeleteDeposit(@Param('id', ParseUUIDPipe) id: string): string {
        return this.depositService.softDeleteDeposit(id);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    hardDeleteDeposit(@Param('id', ParseUUIDPipe) id: string): string {
        return this.depositService.deleteDeposit(id);
    }

    @Get(':accountId')
    @UsePipes(new ValidationPipe())
    getHistoryByAccountId(@Param('accountId', ParseUUIDPipe) accountId: string): DepositEntity[] {
        return this.depositService.getHistoryByAccountId(accountId);
      }
    
    @Get(':dateInit/:dateEnd')
    @UsePipes(new ValidationPipe())
    getHistoryByDataRange(
        @Param('dateInit', ParseIntPipe) dateInit: number,
        @Param('dateEnd', ParseIntPipe) dateEnd: number): DepositEntity[] {
        return this.depositService.getHistoryByDataRange(dateInit, dateEnd);
    }
}

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';

import { TransferService } from '../../../business/services';
import { TransferEntity } from '../../../data/persistence/entities';
import { DataRangeDto, PaginationDto, TransferDto, UpdateTransferDto } from '../../../business/dtos';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Get('account/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccount(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() datarange: DataRangeDto|undefined,
        @Query() pagination: PaginationDto|undefined): TransferEntity[] {
            return this.transferService.getHistory(id, pagination, datarange);
    }
    
    @Post()
    @UsePipes( new ValidationPipe())
    createTransfer(@Body()transfer: TransferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('in/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccountIn(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() datarange: DataRangeDto|undefined,
        @Query() pagination: PaginationDto|undefined): TransferEntity[] {
        return this.transferService.getHistoryIn(id,pagination, datarange);
    }

    @Get('out/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccountOut(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() datarange: DataRangeDto|undefined,
        @Query() pagination: PaginationDto|undefined): TransferEntity[] {
        return this.transferService.getHistoryOut(id, pagination, datarange);
    }

    @Delete(':id')
    deleteTransfer(@Param('id', ParseUUIDPipe) id: string): string {
        return this.transferService.deleteTransfer(id);
    }

    @Patch(':id/soft')
    softDeleteTransfer(@Param('id', ParseUUIDPipe) id: string): string {
        return this.transferService.softDeleteTransfer(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateTransfer(
        @Param('id', ParseUUIDPipe)id: string,
        @Body() transfer: UpdateTransferDto): TransferEntity {
        return this.transferService.updateTransfer(id, transfer);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    updateTransferSomeProperties(
        @Param('id', ParseUUIDPipe)id: string,
        @Body() transfer: UpdateTransferDto): TransferEntity {
        return this.transferService.updateTransfer(id, transfer);
    }

    @Get()
    getAllTransfers(): TransferEntity[] {
        return this.transferService.getAllTransfers();
    }
    
    @Get(':id')
    @UsePipes(new ValidationPipe())
    findOneTransferById(@Param('id', ParseUUIDPipe) id: string): TransferEntity {
        return this.transferService.findOneTransferById(id);
    }
    
    @Get('out/:idOutcome/:dateInit/:dateEnd')
    @UsePipes(new ValidationPipe())
    findTransfersOutcomeByDataRange(
        @Param('idOutcome', ParseUUIDPipe) accountId: string,
        @Param('dateInit', ParseIntPipe) dateInit: number,
        @Param('dateEnd', ParseIntPipe) dateEnd: number
    ): TransferEntity[] {
        return this.transferService.findTransfersOutcomeByDataRange(accountId, dateInit, dateEnd);
    }
    
    @Get('in/:idIncome/:dateInit/:dateEnd')
    @UsePipes(new ValidationPipe())
    findTransfersIncomeByDataRange(
        @Param('idIncome', ParseUUIDPipe) accountId: string,
        @Param('dateInit', ParseIntPipe) dateInit: number,
        @Param('dateEnd', ParseIntPipe) dateEnd: number
    ): TransferEntity[] {
        return this.transferService.findTransfersIncomeByDataRange(accountId, dateInit, dateEnd);
    }
}

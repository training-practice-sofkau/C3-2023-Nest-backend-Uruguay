import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { TransferService } from '../../../business/services';
import { TransferEntity } from '../../../data/persistence/entities';
import { TransferDto } from '../../../business/dtos';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Get('account/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccount(@Param('id', ParseUUIDPipe) id: string): TransferEntity[] {
        return this.transferService.getHistory(id);
    }
    
    @Post()
    @UsePipes( new ValidationPipe())
    createTransfer(@Body()transfer: TransferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('in/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccountIn(@Param('id', ParseUUIDPipe) id: string): TransferEntity[] {
        return this.transferService.getHistoryIn(id);
    }

    @Get('out/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccountOut(@Param('id', ParseUUIDPipe) id: string): TransferEntity[] {
        return this.transferService.getHistoryOut(id);
    }

    @Delete(':id')
    deleteTransfer(@Param('id', ParseUUIDPipe) id: string): void {
        this.transferService.deleteTransfer(id);
    }

    @Patch(':id/soft')
    softDeleteTransfer(@Param('id', ParseUUIDPipe) id: string): void {
        this.transferService.softDeleteTransfer(id);
    }
}

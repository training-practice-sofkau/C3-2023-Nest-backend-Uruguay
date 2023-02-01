import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, UsePipes, ValidationPipe } from '@nestjs/common';

import { TransferService } from '../../../business/services';
import { TransferEntity } from '../../../data/persistence/entities';
import { ParseBoolPipe } from '@nestjs/common/pipes';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {}

    @Get('account/:id')
    @UsePipes(new ValidationPipe())
    getTransfersAccount(@Param('id', ParseUUIDPipe) id: string): TransferEntity[] {
        return this.transferService.getHistory(id);
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

import { Controller, Param } from '@nestjs/common';
import { Body, Delete, Get, Post } from '@nestjs/common/decorators';
import { TransferService } from '../../services/transfer/transfer.service';
import { TransferEntity } from '../../persistence/entities/transfer.entity';
import { CreateTransferDTO } from '../../dtos/create-transfer.dto';
import { DataRangeModel, PaginationModel } from 'src/models';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {

    }

    @Post('/create')
    createTransfer(@Body() transfer: CreateTransferDTO): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('/find-all')
    findAll(@Body() paginator: PaginationModel): TransferEntity[] {
        return this.transferService.findAll(paginator);
    }

    @Get('/get-history-out/:id')
    getHistoryOut(@Param('id') id: string,@Body() pagination: PaginationModel,@Body() dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryOut(id, pagination, dataRange);
    }

    @Get('/get-history-in/:id')
    getHistoryIn(@Param('id') id: string,@Body() pagination: PaginationModel,@Body() dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryIn(id, pagination, dataRange);
    }
    
    @Get('/get-history/:id')
    getHistory(@Param('id') id: string, pagination: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistory(id, pagination, dataRange);
    }

    @Delete('/soft-delete/:id')
    softDeleteTransfer(@Param() id: string): void {
        this.transferService.deleteTransfer(id, true);
    }

    @Delete('/hard-delete/:id')
    hardDeleteTransfer(@Param('id') id: string): void {
        this.transferService.deleteTransfer(id);
    }
}

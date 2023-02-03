import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransferService } from '../../capaLogicaDeNegocio/service/transfer.service';
import { CreateTransferDto } from '../../capaLogicaDeNegocio/dto/transfer.dto';
import { TransferEntity } from '../../capaDeDatos/entity/transfer.entities';
import { paginationDto } from '../../capaLogicaDeNegocio/dto/Pagination.dto';
import { dataRangeDto } from '../../capaLogicaDeNegocio/dto/dataRange.dto';
import { PaginationModel, DataRangeModel } from 'src/module/base/models';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService){}

    @Post('/create')
    createTransfer(@Body() transfer: CreateTransferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('/find-all')
    findAll(@Body() paginator: PaginationModel): TransferEntity[] {
        return this.transferService.findAll();
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
    softDeleteTransfer(@Param('id') id: string): void {
        this.transferService.deleteTransfer(id, true);
    }

    @Delete('/hard-delete/:id')
    hardDeleteTransfer(@Param('id') id: string): void {
        this.transferService.deleteTransfer(id);
    }
}

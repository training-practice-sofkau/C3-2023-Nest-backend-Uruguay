import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransferService } from '../../capaLogicaDeNegocio/service/transfer.service';
import { CreateTransferDto } from '../../capaLogicaDeNegocio/dto/transfer.dto';
import { TransferEntity } from '../../capaDeDatos/entity/transfer.entities';
import { PaginationModel, DataRangeModel } from 'src/module/base/models';
import { paginationDto } from '../../capaLogicaDeNegocio/dto';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService){}

    @Post('/create')
    createTransfer(@Body() transfer: CreateTransferDto): TransferEntity {
        return this.transferService.createTransfer(transfer);
    }

    @Get('/find-all')
    findAll(): TransferEntity[] {
        return this.transferService.findAll();
    }

    @Get('/get-history-out/:id')
    getHistoryOut(@Param('id') id: string,@Body() pagination: PaginationModel,@Body() dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryOut(id, dataRange,pagination);
    }

    @Get('/get-history-in/:id')
    getHistoryIn(@Param('id') id: string,@Body() pagination: paginationDto,@Body() dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryIn(id, dataRange, pagination);
    }
    
    @Get('/get-history/:id')
    getHistory(@Param('id') id: string, pagination: paginationDto, dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistory(id, dataRange, pagination);
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

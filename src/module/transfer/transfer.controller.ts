import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { createTransferDto } from './dto/transfer.dto';
import { TransferEntity } from './transfer.entities';
import { paginationDto } from './dto/Pagination.dto';
import { dataRangeDto } from './dto/dataRange.dto';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService){}

    //getHistory(accountId: string,pagination: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange?: 
    //getHistoryOut(accountId: string,pagination?: PaginationModel,dataRange?: DataRangeModel): TransferEntity[] {//dataRange:DataRangeModel
    
    @Get(`getHistoyIn/:id/:pag/:range`)
    getHistoryIn(
        @Param(`id`)accountId: string,
        @Param(`pag`)pagination?: paginationDto,
        @Param(`range`)dataRange?: dataRangeDto)
        : TransferEntity[] {
            return this.transferService.getHistoryIn(accountId,pagination,dataRange);
        }
    
    @Get(`getHistoyIn/:id/:pag/:range`)
    getHistoryOut(
        @Param(`id`)accountId: string,
        @Param(`pag`)pagination?: paginationDto,
        @Param(`range`)dataRange?: dataRangeDto)
        : TransferEntity[] {
        return this.transferService.getHistoryOut(accountId,pagination,dataRange);
        }


    @Post(`create`)
    createTrensfer(@Body() newTransfer : createTransferDto):TransferEntity{
        return this.transferService.createTransfer(newTransfer);
    }

    @Delete(`deleteSof/:id/:sof`)
    deleteTransfer(@Param(`id`) transferId : string,
    @Param(`sof`) transferSof : boolean){
        return this.transferService.deleteTransfer(transferId,transferSof);
    }

    @Delete(`deleteHard/:id`)
    deleteTransferHard(@Param(`id`) transferId : string){
        return this.transferService.deleteTransfer(transferId);
    }
}

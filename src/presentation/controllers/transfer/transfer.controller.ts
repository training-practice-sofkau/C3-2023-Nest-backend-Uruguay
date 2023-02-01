import { Body, Controller, Get, Patch, Post, Delete } from '@nestjs/common';
import { TransferService } from 'src/business/services';
import { TransferEntity } from 'src/data';
import { DataRangeDto, PaginationDto, TransferDto } from 'src/data/dtos';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @Post("create")
    createTransfer(@Body() newTransfer: TransferDto): TransferEntity {
        return this.transferService.createTransfer(newTransfer)
    }

    @Get("historyout")
    getHistoryOut(@Body()
    accountId: string,
        pagination?: PaginationDto,
        dataRange?: DataRangeDto): TransferEntity[] {
        return this.transferService.getHistoryOut(accountId, pagination, dataRange)
    }

    @Get("historyin")
    getHistoryIn(@Body()
    accountId: string,
        pagination?: PaginationDto,
        dataRange?: DataRangeDto): TransferEntity[] {
        return this.transferService.getHistoryIn(accountId, pagination, dataRange)
    }

    @Get("history")
    getHistory(@Body()
    accountId: string,
        pagination?: PaginationDto,
        dataRange?: DataRangeDto): TransferEntity[] {
        return this.transferService.getHistory(accountId, pagination, dataRange)
    }

    @Patch("delete")
    deleteTransfer(@Body() transferId: string): void {
        this.transferService.deleteTransfer(transferId)
    }

}

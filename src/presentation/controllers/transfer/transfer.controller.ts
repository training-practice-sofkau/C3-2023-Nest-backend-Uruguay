import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

import { TransferService } from 'src/business/services';
import { TransferEntity, PaginationEntity } from 'src/data/persistence/entities';
import { CreateTransferDto } from 'src/business/dtos';

@Controller('transfer')
export class TransferController {

    constructor(private transferService: TransferService) { }


    // create tranfer
    // TODO: implement newTranferDTO to use instead of transferModel
    @Post('register')
    async createTransfer(@Body() transfer: CreateTransferDto): Promise<TransferEntity> {

        return await this.transferService.createTransfer(transfer);
    }

    // get history by origin account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('from/:id')
    getTransfersFromOriginAccount(@Param('id', ParseUUIDPipe) accountId: string,
        @Query('limit') limit?: number)
        : TransferEntity[] {

        const page = new PaginationEntity();
        page.limit = limit;
        page.offset = 0;

        return this.transferService.getHistoryOut(accountId, page);
    }

    // get history by destination account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('to/:id')
    getTransfersToDestinationAccount(@Param('id', ParseUUIDPipe) accountId: string,
        @Query('limit') limit?: number)
        : TransferEntity[] {

        const page = new PaginationEntity();
        page.offset = 0;
        page.limit = limit;

        return this.transferService.getHistoryIn(accountId, page);
    }


    // get historical in and out trasnfers for an account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('getAll/:id')
    getAllTransfersByAccount(@Param('id', ParseUUIDPipe) accountId: string,
        @Query('limit') limit?: number)
        : TransferEntity[] {

        const page = new PaginationEntity();
        page.offset = 0;
        page.limit = limit;

        return this.transferService.getHistory(accountId, page);
    }

    // delete transfer ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteTransfer(@Param('id', ParseUUIDPipe) transferId: string,
        @Query('soft', ParseBoolPipe) soft?: boolean): Promise<void> {

        await this.transferService.deleteTransfer(transferId);
    }


}

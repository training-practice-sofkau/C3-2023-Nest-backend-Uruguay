import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { TransferService } from 'src/business/services';
import { TransferEntity, PaginationEntity } from 'src/data/persistence/entities';
import { CreateTransferDto } from 'src/business/dtos';

@Controller('transfer')
export class TransferController {

    constructor( private transferService: TransferService) {}


    // create tranfer
    // TODO: implement newTranferDTO to use instead of transferModel
    @Post('register')
    async createTransfer(@Body() transfer: CreateTransferDto): Promise<TransferEntity>{

        return await this.transferService.createTransfer(transfer);
    }

    // get history by origin account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('From/:id')
    async getTransfersFromOriginAccount(@Param('id', ParseUUIDPipe) accountId: string): Promise<TransferEntity[]> {

        return await this.transferService.getHistoryOut(accountId);
    }   

    // get history by destination account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('To/:id')
    async getTransfersToDestinationAccount(@Param('id', ParseUUIDPipe) accountId: string, @Param('limit') limit: number): Promise<TransferEntity[]> {
      
        const page= new PaginationEntity();
        page.offset = 0;
        page.limit= limit;

        return this.transferService.getHistoryIn(accountId, page);
    }   


    // get historical in and out trasnfers for an account
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('getAll/:id')
    async getAllTransfersByAccount(@Param('id', ParseUUIDPipe) accountId: string): Promise<TransferEntity[]> {

        return await this.transferService.getHistory(accountId);
    }   

    // delete transfer ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteTransfer(@Param('id', ParseUUIDPipe) transferId: string): Promise<void> {
        await this.transferService.deleteTransfer(transferId);
    }


}

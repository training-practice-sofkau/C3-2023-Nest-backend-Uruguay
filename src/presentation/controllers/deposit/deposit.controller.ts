import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

import { DepositEntity } from 'src/data/persistence/entities';
import { DepositService } from 'src/business/services';
import { CreateDepositDto } from 'src/business/dtos';
import { PaginationEntity } from '../../../data/persistence/entities/pagination.entity';

@Controller('deposit')
export class DepositController {

    constructor(private depositService: DepositService) { }


    //TODO: verify JWT for the user ( if is allow to make transactions )

    // Create new deposit        
    @Post('register')
    async createDeposit(@Body() deposit: CreateDepositDto): Promise<DepositEntity> {

        return await this.depositService.createDeposit(deposit);
    }

    // delete Deposit ( Only soft delete from here )
    @Delete('delete/:id')
    deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string,
        @Query('soft', ParseBoolPipe) soft?: boolean): void {

        this.depositService.deleteDeposit(depositId, soft);
    }


    // Get historical Data    
    @Get('/:id')
    getDeposit(@Param('id', ParseUUIDPipe) depositId: string,
        @Query('limit') limit?: number)
        : DepositEntity[] {

        const page = new PaginationEntity();
        page.limit = limit;        
        page.offset = 0;

        return this.depositService.getHistory(depositId, page);

    }
}

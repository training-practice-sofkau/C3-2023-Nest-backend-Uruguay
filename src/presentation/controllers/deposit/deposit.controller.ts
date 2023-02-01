import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';

import { DepositEntity } from 'src/data/persistence/entities';
import { DepositService } from 'src/business/services';
import { CreateDepositDto } from 'src/business/dtos';

@Controller('deposit')
export class DepositController {

    constructor (private depositService: DepositService) {}


    //TODO: verify JWT for the user ( if is allow to make transactions )

    // Create new deposit        
    @Post('register')
    async createDeposit(@Body() deposit: CreateDepositDto): Promise<DepositEntity>{

        return await this.depositService.createDeposit(deposit);
    }

    // delete Deposit ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string,
                        @Query('soft', ParseBoolPipe) soft?: boolean): Promise<void> {
                            
        await this.depositService.deleteDeposit(depositId, soft);
    }


    // Get historical Data    
    @Get('/:id')
    async getDeposit(@Param('id', ParseUUIDPipe) depositId: string): Promise<DepositEntity[]> {

        return await this.depositService.getHistory(depositId);

    }
}

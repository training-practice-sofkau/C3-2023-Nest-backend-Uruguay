import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepositEntity } from 'src/persistence/entities';

import { DepositService } from '../../services';
import { DepositModel } from '../../models/deposit.model';

@Controller('deposit')
export class DepositController {

    constructor (private depositService: DepositService) {}


    //TODO: verify JWT for the user ( if is allow to make transactions )

    // Create new deposit    
    // TODO: implement newDepositDTO to use instead of depositModel
    @Post('register')
    async createDeposit(@Body() deposit: DepositModel): Promise<DepositEntity>{

        return await this.depositService.createDeposit(deposit);
    }

    // delete Deposit ( Only soft delete from here )
    @Delete('/:id')
    async deleteDeposit(@Param('id') accountId: string): Promise<void> {
        await this.depositService.deleteDeposit(accountId);
    }


    // Get historical Data
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('/:id')
    async getDeposit(@Param('id') accountId: string): Promise<DepositEntity[]> {

        return await this.depositService.getHistory(accountId);

    }
}

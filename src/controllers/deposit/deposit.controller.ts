import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { DepositEntity } from 'src/persistence/entities';

import { DepositService } from '../../services';
import { DepositModel } from '../../models/deposit.model';
import { CreateDepositDto } from '../../dtos/create-deposit.dto';

@Controller('deposit')
export class DepositController {

    constructor (private depositService: DepositService) {}


    //TODO: verify JWT for the user ( if is allow to make transactions )

    // Create new deposit    
    // TODO: implement newDepositDTO to use instead of depositModel
    @Post('register')
    async createDeposit(@Body() deposit: CreateDepositDto): Promise<DepositEntity>{

        return await this.depositService.createDeposit(deposit);
    }

    // delete Deposit ( Only soft delete from here )
    @Delete('delete/:id')
    async deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string): Promise<void> {
        await this.depositService.deleteDeposit(depositId);
    }


    // Get historical Data
    //TODO: see how to send values for pagination and date range ( look for info and methods )
    @Get('/:id')
    async getDeposit(@Param('id', ParseUUIDPipe) depositId: string): Promise<DepositEntity[]> {

        return await this.depositService.getHistory(depositId);

    }
}

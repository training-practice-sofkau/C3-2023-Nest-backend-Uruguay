import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDepositDTO } from 'src/dtos/create-deposit-dto';
import { PaginationModel } from 'src/models/i-pagination-model';
import { DepositEntity } from 'src/persistence/entities/deposit-entity';
import { DepositService } from 'src/services/deposit/deposit.service';

@Controller('deposit')
export class DepositController {

    constructor(private readonly depositService: DepositService) {}

    @Post('/create')
    createDeposit(@Body() deposit: CreateDepositDTO): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }

    @Get('/find-all')
    findAll(@Body() pagination: PaginationModel): DepositEntity[] {
        return this.depositService.findAll(pagination);
    }

    @Delete('/soft-delete/:id')
    softDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id, true);
    }

    @Delete('/hard-delete/:id')
    hardDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id);
    }

  

}

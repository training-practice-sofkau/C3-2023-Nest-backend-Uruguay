import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DepositDto } from 'src/dtos/deposit.dto';
import { DepositEntity } from '../../persistence/entities/deposit.entity';
import { DepositService } from '../../services/deposit/deposit.service';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) { }

    @Post()
    createDeposit(@Body() newDeposit: DepositDto): DepositEntity {
        return this.depositService.createDeposit(newDeposit)
    }

    @Delete("delete/:id/:bool")
    deleteDeposit(@Param("id") depositId: string, @Param("bool") depositDelete: boolean) {
        this.depositService.deleteDeposit(depositId, depositDelete)
    }

    @Get("history/:id")
    getHistory(@Param("id") depositId: string){
        return this.depositService.getHistory(depositId)
    }
}

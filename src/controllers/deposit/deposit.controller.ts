import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from '../../services/deposit/deposit.service';
import { CreateDepositDTO } from '../../dtos/create-deposit.dto';
import { DepositEntity } from '../../persistence/entities/deposit.entity';

@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService: DepositService) {}

    @Post('/create')
    createDeposit(@Body() deposit: CreateDepositDTO): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }
}

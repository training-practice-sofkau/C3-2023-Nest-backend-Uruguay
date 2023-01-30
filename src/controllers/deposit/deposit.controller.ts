import { Controller, Get, Delete, Post, Body } from '@nestjs/common';
import { DepositDto } from 'src/dtos/deposit.dto';
import { DepositService } from 'src/services';
import { depositEntity } from '../../persistence';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  createDeposit(@Body() deposit: DepositDto): depositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Delete(':id')
  deleteDeposit(depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  @Get(':id')
  getHistory(depositId: string): depositEntity[] {
    return this.depositService.getHistory(depositId);
  }
}






import { Body, Controller, Get,  Param,  ParseUUIDPipe,  Post, Put } from '@nestjs/common';
import { DepositDto } from 'src/dtos/DepositDto';
import { DepositEntity } from 'src/persistence';
import { DepositService } from '../../services/deposit/deposit.service';

@Controller('deposit')
export class DepositController {
    constructor(private readonly DepositService: DepositService) {}


  @Post('newDeposit')
  creatDeposit(@Body()deposit: DepositDto): DepositEntity  {
    
    return this.DepositService.createDeposit(deposit);
  }

  @Get(':id')
  getHistory(@Param('id' , ParseUUIDPipe) depositId: string):  DepositEntity[] {
    return this.DepositService.getHistory(depositId);
  }

 
  @Put('delete/:id')
  deleteDeposit(@Param('id', ParseUUIDPipe) @Body()depositId: string): void {
    return this.DepositService.deleteDeposit(depositId);
  }
}



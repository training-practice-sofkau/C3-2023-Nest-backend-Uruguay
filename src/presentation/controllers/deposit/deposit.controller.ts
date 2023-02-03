import { Body, Controller, Get,  Param,  ParseUUIDPipe,  Post, Put } from '@nestjs/common';
import { DepositDto } from 'src/business';
import { DepositEntity } from 'src/Data';
import { DepositService } from 'src/business';

@Controller('deposit')
export class DepositController {
    constructor(private readonly DepositService: DepositService) {}


  @Post('newDeposit')
  creatDeposit(@Body()deposit: DepositDto): DepositEntity  {
    
    return this.DepositService.createDeposit(deposit);
  }

  @Post(':id')
  getHistory(@Param('id' , ParseUUIDPipe) depositId: string):  DepositEntity[] {
    return this.DepositService.getHistory(depositId);
  }

 
  @Put('delete/:id')
  deleteDeposit(@Param('id', ParseUUIDPipe) @Body()depositId: string): void {
    return this.DepositService.deleteDeposit(depositId);
  }

 @Get()
getAll(){
 return this.DepositService.getAll()
}
}



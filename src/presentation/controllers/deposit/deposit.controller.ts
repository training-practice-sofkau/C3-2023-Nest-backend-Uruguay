import { Body, Controller, Get,  Param,  ParseUUIDPipe,  Post, Put, Query } from '@nestjs/common';
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

  @Get(':id')
  getHistory(@Param('id' , ParseUUIDPipe) depositId: string):  DepositEntity[] {
    return this.DepositService.getHistory(depositId);
  }

 
  @Put('delete/:id')
deleteDeposit(@Param('id', ParseUUIDPipe) depositId: string,
  @Query('soft') soft?: boolean
): void {
  return this.DepositService.deleteDeposit(depositId, soft);
}


 @Get()
getAll(){
 return this.DepositService.getAll()
}
}



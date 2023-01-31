import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { depositEntity } from 'src/Capa-Data/persistence';
import { DepositService } from 'src/Capa-Negocio/services';
import { DepositDto } from 'src/Capa-Presentacion/dtos/deposit.dto';


@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('newRepo')
  createDeposit(@Body() deposit: DepositDto): depositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Put("delete/:depositId")
  deleteDeposit(@Param("depositId") depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  // @Get("/:id")
  // getHistory(@Param('id', ParseUUIDPipe)depositId: string): depositEntity[] {
  //   return this.depositService.getHistory(depositId);
  // }
}






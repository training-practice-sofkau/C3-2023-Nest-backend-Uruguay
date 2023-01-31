import { Controller, Post, Body, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { TransferService } from 'src/Capa-Negocio/services';
import { TransferDto } from 'src/Capa-Presentacion/dtos/transfer.dto';



@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post("newTransfer")
createTransfer(@Body() transfer: TransferDto) {
    return this.transferService.createTransfer(transfer);
  }

  @Delete("/:id")
   deleteTransfer(@Param('id', ParseUUIDPipe) transferId: string){
    return this.transferService.deleteTransfer(transferId);
  }
}
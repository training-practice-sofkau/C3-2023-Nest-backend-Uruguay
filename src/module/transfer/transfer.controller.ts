import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { transferDto } from './dto/transfer.dto';
import { TransferEntity } from './transfer.entities';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService){}

    /**
     * createTransfer(transfer: transferDto): TransferEntity
     * deleteTransfer(transferId: string , sof? : boolean): void 
     * 
     */

    @Post(`crearTransfer`)
    createTrensfer(@Body() newTransfer : transferDto):TransferEntity{
        return this.transferService.createTransfer(newTransfer);
    }

    @Delete(`borrarTransfer/:id/:sof`)
    deleteTransfer(@Param(`id`) transferId : string,
    @Param(`sof`) transferSof : boolean){
        return this.transferService.deleteTransfer(transferId,transferSof);
    }
}

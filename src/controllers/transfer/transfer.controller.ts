import { Controller, Delete, Get, Param } from '@nestjs/common';
import { DataRangeModel, PaginationModel } from '../../models';
import { TransferEntity } from '../../persistence';
import { TransferService } from '../../services';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @Get('getHOut/:id') 
    getHistoryOut(@Param('id') accountId: string, pagination?: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryOut( accountId, pagination, dataRange );
    }

    @Get('getHIn/:id')
    getHistoryIn(@Param('id') accountId: string, pagination?: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistoryIn( accountId, pagination, dataRange );
    }

    @Get('getHistory/:id')
    getHistory(@Param('id') accountId: string, pagination: PaginationModel, dataRange?: DataRangeModel): TransferEntity[] {
        return this.transferService.getHistory( accountId, pagination, dataRange );
    } 

    @Delete('deleteTransfer/:id')
    deleteTransfer(@Param('id') transferId: string): void {
        return this.transferService.deleteTransfer(transferId);
    }
}

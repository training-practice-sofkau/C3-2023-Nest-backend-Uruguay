import { Controller, Post ,Body, Get, Param, Delete } from '@nestjs/common';
import { DepositService } from '../../capaLogicaDeNegocio/service';
import { DepositDto } from '../../capaLogicaDeNegocio/dto';
import { DepositEntity } from '../../capaDeDato/entity';
import { DataRangeModel, PaginationModel } from 'src/module/base/models';


@Controller('deposit')
export class DepositController {
    constructor(private readonly depositService : DepositService){}
    // FALTA > getHistory(depositId: string , pagination?: PaginationModel,dataRange?: DataRangeModel): DepositEntity[]
    @Post('/create')
    createDeposit(@Body() deposit: DepositDto): DepositEntity {
        return this.depositService.createDeposit(deposit);
    }

    @Get('/find-all')
    findAll(): DepositEntity[] {
        return this.depositService.findAll();
    }

    @Delete('/soft-delete/:id')
    softDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id, true);
    }

    @Delete('/hard-delete/:id')
    hardDelete(@Param('id') id: string): void {
        this.depositService.deleteDeposit(id);
    }

    @Get('/get-history/:id')
    getHistory(@Param('id') id: string, @Body() pagination: PaginationModel, @Body() dateRange?: DataRangeModel): DepositEntity[] {
        return this.depositService.getHistory(id,pagination,dateRange);
    }
    


}

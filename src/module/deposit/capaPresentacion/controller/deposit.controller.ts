import { Controller, Post ,Body, Get, Param, Delete } from '@nestjs/common';
import { DepositService } from '../../capaLogicaDeNegocio/service';
import { depositDto } from '../../capaLogicaDeNegocio/dto';
import { DepositEntity } from '../../capaLogicaDeNegocio/entity';


@Controller('deposit')
export class DepositController {
    constructor(private readonly depositServer : DepositService){}
    // FALTA > getHistory(depositId: string , pagination?: PaginationModel,dataRange?: DataRangeModel): DepositEntity[]
    @Post(`create`)
    createDeposit(@Body() newDeposit : depositDto):DepositEntity{
        return this.depositServer.createDeposit(newDeposit);
    }
    @Get(`all`) // Tiene que pasarle un rango (Pagination)
    findAll():DepositEntity[]{
        return this.depositServer.findAll();
    }
    
    @Delete(`delete/:id/:sof`)//pero sof es boolean es negativo o positivo
    deleteDepositSof(@Param(`id`) depositId : string ,
     @Param(`sof`) depositSof : boolean){
        return this.depositServer.deleteDeposit(depositId,depositSof);
        
    }

    @Delete(`delete/:id`)
    deleteDepositHard(@Param(`id`) depositId : string ){
        return this.depositServer.deleteDeposit(depositId);
    }
    


}

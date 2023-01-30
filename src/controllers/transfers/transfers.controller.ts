import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTransferDTO } from 'src/dtos/create-transfer-dto';
import { PaginationModel } from 'src/models/i-pagination-model';
import { TransferEntity } from 'src/persistence/entities/transfer-entity';
import { TransferService } from 'src/services/transfer/transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {

    }

}
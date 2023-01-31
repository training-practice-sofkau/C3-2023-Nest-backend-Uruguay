import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { registerDecorator } from 'class-validator';
import { TransferEntity } from 'src/persistence/entities/transfer-entity';
import { TransferService } from 'src/services/transfer/transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) {

     


    }

}
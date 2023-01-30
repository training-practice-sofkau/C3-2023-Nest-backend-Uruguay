
import { Injectable, NotFoundException } from '@nestjs/common';
import { IDataRangeModel } from 'src/models/i-data-range-model';
import { PaginationModel } from 'src/models/i-pagination-model';
import { ITransferModel } from 'src/models/i-transfer-model';
import { TransferEntity } from 'src/persistence/entities/transfer-entity';
import { TransferRepository } from 'src/persistence/repositories/TransferRepo';

@Injectable()
export class TransferService {
  constructor(private readonly transferRepository: TransferRepository) { }
  
}


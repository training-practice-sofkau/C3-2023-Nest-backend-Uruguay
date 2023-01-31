import { Test, TestingModule } from '@nestjs/testing';
import { TransferController } from '.';
import { TransferRepository } from '../../data/persistence';
import { TransferModule } from '../../application/modules';
import { TransferService } from '../../business/services';

describe('TransferController', () => {
  let controller: TransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TransferModule],
      controllers: [TransferController],
      providers: [
        {
          provide: TransferService,
          useClass: TransferRepository,
        },
      ]
    }).compile();

    controller = module.get<TransferController>(TransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

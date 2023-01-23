import { Test, TestingModule } from '@nestjs/testing';
import { CusotmerController } from './cusotmer.controller';

describe('CusotmerController', () => {
  let controller: CusotmerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CusotmerController],
    }).compile();

    controller = module.get<CusotmerController>(CusotmerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TansferController } from './tansfer.controller';

describe('TansferController', () => {
  let controller: TansferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TansferController],
    }).compile();

    controller = module.get<TansferController>(TansferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

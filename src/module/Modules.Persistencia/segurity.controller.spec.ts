import { Test, TestingModule } from '@nestjs/testing';
import { SegurityController } from './segurity.controller';

describe('SegurityController', () => {
  let controller: SegurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegurityController],
    }).compile();

    controller = module.get<SegurityController>(SegurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

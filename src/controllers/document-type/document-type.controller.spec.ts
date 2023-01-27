import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTypeController } from './document-type.controller';

describe('DocumentTypeController', () => {
  let controller: DocumentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentTypeController],
    }).compile();

    controller = module.get<DocumentTypeController>(DocumentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

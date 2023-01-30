import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTypeService } from './document-type.service';

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentTypeService],
    }).compile();

    service = module.get<DocumentTypeService>(DocumentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

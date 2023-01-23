import { Module } from '@nestjs/common';
import { DocumentTypeController } from '../../controllers/document_type/document_type.controller';
import { DocumentTypeService } from '../../services/document_type/document_type.service';

@Module({
    imports: [],
    controllers: [DocumentTypeController],
    providers: [DocumentTypeService],})
export class DocumentTypeModule {}

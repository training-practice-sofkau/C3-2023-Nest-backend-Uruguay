import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepo } from '../';

@Injectable()
export class DocumentTypeRepository extends BaseRepo<DocumentTypeEntity> {}

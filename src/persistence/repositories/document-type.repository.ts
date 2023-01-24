import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepo } from './base/base-abstract-Repos';

@Injectable()
export class DocumentTypeRepository extends BaseRepo<DocumentTypeEntity>{


}
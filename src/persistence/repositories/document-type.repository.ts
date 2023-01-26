import { Injectable } from '@nestjs/common';
import { Repository } from "./base/Repository";
import { DocumentTypeEntity } from '../entities';

@Injectable()
export class DocumentTypeRepository extends Repository<DocumentTypeEntity> {

}
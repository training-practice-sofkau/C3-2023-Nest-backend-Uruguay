import { Injectable } from '@nestjs/common';
import { DepositEntity } from '../entities';
import { BaseRepo } from '../';

@Injectable()
export class DepositRepository extends BaseRepo<DepositEntity> {}

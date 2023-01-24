import { Injectable } from "@nestjs/common";
import { DepositEntity } from '../entities/deposit.entity';
import { BaseRepo } from "./base/base-abstract-Repos";


@Injectable()
export class DepositRepository  extends BaseRepo<DepositEntity> {

}
import { Injectable } from "@nestjs/common";
import { DepositEntity } from "../entities/deposit.entity";
import { Repository } from "./base/repository.base";

@Injectable()
export class DepositRepository extends Repository<DepositEntity>{

}
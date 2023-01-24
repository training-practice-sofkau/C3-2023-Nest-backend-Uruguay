import { Injectable } from "@nestjs/common";
import { TransferEntity } from "../entities/transfer.entity";
import { Repository } from "./base/repository.base";

@Injectable()
export class TransferRepository extends Repository<TransferEntity>{

}
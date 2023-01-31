import { IsNumber, IsPositive, IsUUID } from "class-validator"
import { AccountEntity } from '../../data/persistance/entities/account.entity';

export class DepositDto {

    @IsUUID(4, { message: "This must be UUID" })
    id: string

    account: AccountEntity

    @IsNumber()
    @IsPositive()
    amount: number
}
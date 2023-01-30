import { IsNumber, IsPositive, IsUUID } from "class-validator"
import { AccountEntity } from '../persistence/entities/account.entity';

export class DepositDto {

    @IsUUID(4, { message: "This must be UUID" })
    id: string

    account: AccountEntity

    @IsNumber()
    @IsPositive()
    amount: number
}
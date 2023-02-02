import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsUUID } from "class-validator";

export class ChangeStateDto {

    @ApiProperty()
    @IsUUID(4, { message: "account id must to be uuid" })
    id: string;

    @ApiProperty()
    @IsBooleanString({ message: 'the state is not an boolean.' })
    state: boolean;

}
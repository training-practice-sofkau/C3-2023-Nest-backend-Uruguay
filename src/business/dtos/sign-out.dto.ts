import { IsNotEmpty, IsUUID } from "class-validator";

export class SignOutDto {

    @IsUUID(4, { message: "this must to be uuid v4" })
    @IsNotEmpty()
    id: string;
}
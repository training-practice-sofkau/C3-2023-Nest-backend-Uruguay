import { IsJWT, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SignOutDto {

    @IsNotEmpty()
    @IsString()
    @IsJWT()
    jwt: string;
}
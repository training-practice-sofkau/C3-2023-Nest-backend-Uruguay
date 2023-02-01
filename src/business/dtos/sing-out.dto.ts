import { IsString } from "class-validator";

export class SingOutDTO {
    @IsString()
    token: string;
}
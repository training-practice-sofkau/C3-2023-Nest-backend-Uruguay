import { IsString } from "class-validator";

export class TypeDTO {
    @IsString()
    name: string;
}
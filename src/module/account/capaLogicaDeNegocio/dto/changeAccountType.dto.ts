import { IsString } from "class-validator";

export class ChangeAccountTypeDTO {

    @IsString({message: 'Se requiere un tipo string'})
    accountType?: string;

}
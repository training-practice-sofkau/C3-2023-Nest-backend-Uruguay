import { IsNotEmpty, IsString } from "class-validator";
export class DocumentTypeDto{

    @IsNotEmpty({message:'This value cannot be empty!'})
    @IsString()
    name: string;
}
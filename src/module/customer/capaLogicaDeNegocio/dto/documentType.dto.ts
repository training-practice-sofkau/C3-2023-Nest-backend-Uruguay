import { IsString } from 'class-validator';
export class DocumentTypeDto{

    @IsString()
    name: string;

}
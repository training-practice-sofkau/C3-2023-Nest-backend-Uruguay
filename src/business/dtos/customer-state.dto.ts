import { IsBoolean } from "class-validator";

export class CustomerStateDTO {
    @IsBoolean()
    state: boolean;
}
import { PaginationModel } from "../../models";

export class PaginationEntity <T> implements PaginationModel <T> {
    offset: number;
    limit?: number;
}

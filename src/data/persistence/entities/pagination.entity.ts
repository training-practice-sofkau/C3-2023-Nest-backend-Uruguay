import { PaginationModel } from "../../../business/models";

export class PaginationEntity <T> implements PaginationModel <T> {
    offset: number;
    limit?: number;
}

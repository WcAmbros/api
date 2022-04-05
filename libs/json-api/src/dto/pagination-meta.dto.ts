import { ApiProperty } from "@nestjs/swagger";
import { IPaginationMetaOptions } from "../interfaces";

export class PaginationMetaDto {
    @ApiProperty({example: 1})
    readonly page: number;

    @ApiProperty({example: 10})
    readonly limit: number;

    @ApiProperty({example: 3})
    readonly itemCount: number;

    @ApiProperty({example: 3})
    readonly pageCount: number;

    @ApiProperty({example: true})
    readonly hasPreviousPage: boolean;

    @ApiProperty({example: true})
    readonly hasNextPage: boolean;

    constructor({ options, itemCount }: IPaginationMetaOptions) {
        this.page = options.page;
        this.limit = options.limit;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
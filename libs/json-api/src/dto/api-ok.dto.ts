import {ApiProperty} from "@nestjs/swagger";

export class ApiOkDto<T> {
    @ApiProperty()
    readonly data: T;
    constructor(data: T) {
        this.data = data;
    }
}
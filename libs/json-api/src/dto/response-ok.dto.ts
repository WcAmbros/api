import {ApiProperty} from "@nestjs/swagger";

export class ResponseOkDto<T> {
    @ApiProperty()
    readonly data: T;
    constructor(data: T) {
        this.data = data;
    }
}
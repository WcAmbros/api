import {ApiProperty} from "@nestjs/swagger";

export class ResponseInvalidDto {
    @ApiProperty()
    readonly statusCode: number
    @ApiProperty()
    readonly error: string
    @ApiProperty({required: false})
    readonly message?: string
}
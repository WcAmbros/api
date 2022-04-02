import {IUserCreationAttrs} from "../intrefaces/user.interface";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto implements IUserCreationAttrs{
    @ApiProperty({example: 'user'})
    readonly login: string
    @ApiProperty({example: 'Иван'})
    readonly firstName: string;
    @ApiProperty({example: 'Иванов'})
    readonly lastName: string;
}

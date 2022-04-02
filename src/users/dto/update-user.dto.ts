import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {IUserUpdateAttrs} from "../intrefaces/user.interface";

export class UpdateUserDto extends CreateUserDto implements IUserUpdateAttrs{
    @ApiProperty({example: true})
    isActive: boolean;
}

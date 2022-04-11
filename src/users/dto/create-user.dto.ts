import { IUserCreationAttrs } from '../intrefaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserExample } from '../../i18n/ru';

export class CreateUserDto implements IUserCreationAttrs {
  @ApiProperty(UserExample.LOGIN)
  @IsString()
  readonly login: string;

  @IsString()
  @ApiProperty(UserExample.FIRST_NAME)
  readonly firstName: string;

  @IsString()
  @ApiProperty(UserExample.LAST_NAME)
  readonly lastName: string;
}

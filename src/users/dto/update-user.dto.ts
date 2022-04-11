import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean } from 'class-validator';
import { UserExample } from '../../i18n/ru';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  @ApiProperty(UserExample.IS_ACTIVE)
  isActive: boolean;
}

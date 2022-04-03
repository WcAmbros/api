import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, HttpStatus, HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User} from "./entities/user.entity";
import { PageDto, PageOptionsDto } from "@app/json-api";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({description: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({description: 'Поиск всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto):Promise<PageDto<User>>  {
    return this.usersService.findAll(pageOptionsDto);
  }

  @ApiOperation({description: 'Возвращает пользователя'})
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({description: 'Обновление пользователя'})
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({description: 'Удаление пользователя'})
  @ApiResponse({status: 200, type: User})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

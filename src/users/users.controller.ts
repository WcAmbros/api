import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, HttpStatus, HttpCode, ValidationPipe, UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {User} from "./entities/user.entity";
import { PageDto, PageOptionsDto } from "@app/json-api";
import {UsersControllerDescription} from "../i18n/ru";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation(UsersControllerDescription.CREATE)
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation(UsersControllerDescription.FIND_ALL)
  @ApiResponse({status: 200, type: [User]})
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto):Promise<PageDto<User>>  {
    return this.usersService.findAll(pageOptionsDto);
  }

  @ApiOperation(UsersControllerDescription.FIND_ONE)
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation(UsersControllerDescription.UPDATE)
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation(UsersControllerDescription.DELETE)
  @ApiResponse({status: 200, type: User})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}

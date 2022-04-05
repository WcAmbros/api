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
import {ApiOperation, ApiResponse, ApiTags, ApiBadRequestResponse} from '@nestjs/swagger';
import {User} from "./entities/user.entity";
import * as JsonApi from "@app/json-api";
import {UsersControllerDescription} from "../i18n/ru";


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation(UsersControllerDescription.CREATE)
  @JsonApi.ApiOkResponse(User)
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<JsonApi.ResponseOkDto<User>> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation(UsersControllerDescription.FIND_ALL)
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  @JsonApi.ApiOkListResponse(User)
  @Get()
  findAll(@Query() pageOptionsDto: JsonApi.PaginationOptionsDto):Promise<JsonApi.ResponseOkListDto<User>>  {
    return this.usersService.findAll(pageOptionsDto);
  }

  @ApiOperation(UsersControllerDescription.FIND_ONE)
  @JsonApi.ApiOkResponse(User)
  @Get(':id')
  findOne(@Param('id') id: number):Promise<JsonApi.ResponseOkDto<User>> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation(UsersControllerDescription.UPDATE)
  @JsonApi.ApiOkResponse(User)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<JsonApi.ResponseOkDto<User>> {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation(UsersControllerDescription.DELETE)
  @ApiResponse({status: 200})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}

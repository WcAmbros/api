import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";
import {ApiOkDto, ApiOkListDto, PaginationOptionsDto, PaginationMetaDto} from "@app/json-api";
import * as JsonApi from "@app/json-api";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User)
      private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto):Promise<JsonApi.ApiOkDto<User>> {
    const model = await this.userModel.create(createUserDto);
    return new ApiOkDto(model);
  }

  async findAll(options: PaginationOptionsDto): Promise<ApiOkListDto<User>> {
    const {limit, offset, order} = options
    const { count, rows } = await this.userModel.findAndCountAll({
      limit,
      offset,
      order: [['id', order]],
    });

    const pageMetaDto = new PaginationMetaDto({ itemCount: count, options});
    return new ApiOkListDto(rows, pageMetaDto);
  }

  async findOne(id: number): Promise<ApiOkDto<User>> {
    const model = await this.userModel.findOne({where: {id}});
    return new ApiOkDto(model);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ApiOkDto<User>> {
    const [,[model]] = await this.userModel.update( updateUserDto,{where: { id }, returning: true})
    return  new ApiOkDto(model);
  }

  remove(id: number): Promise<any> {
    return this.userModel.destroy({where: {id}}
    )
  }
}

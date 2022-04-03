import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";
import { PageDto, PageOptionsDto, PageMetaDto } from "@app/json-api";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User)
      private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const { count, rows } = await this.userModel.findAndCountAll({
      limit: pageOptionsDto.limit,
      offset: pageOptionsDto.offset,
      order: [['id',pageOptionsDto.order]],
    });

    const pageMetaDto = new PageMetaDto({ itemCount: count, pageOptionsDto });
    return new PageDto(rows, pageMetaDto);
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({where: {id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User>  {
    const [,[user]] = await this.userModel.update( updateUserDto,{where: { id }, returning: true})
    return  user
  }

  remove(id: number): Promise<any> {
    return this.userModel.destroy({where: {id}}
    )
  }
}

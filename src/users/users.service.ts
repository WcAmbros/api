import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";
import {ResponseOkDto, ResponseOkListDto, PaginationOptionsDto, PaginationMetaDto} from "@app/json-api";
import {UserEntity} from "../i18n/ru/user.entity";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User)
      private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto):Promise<ResponseOkDto<User>> {
    const model = await this.userModel.create(createUserDto);
    return new ResponseOkDto(model);
  }

  async findAll(options: PaginationOptionsDto): Promise<ResponseOkListDto<User>> {
    const {limit, offset, order} = options
    const { count, rows } = await this.userModel.findAndCountAll({
      limit,
      offset,
      order: [['id', order]],
    });

    const pageMetaDto = new PaginationMetaDto({ itemCount: count, options});
    return new ResponseOkListDto(rows, pageMetaDto);
  }

  async findOne(id: number): Promise<ResponseOkDto<User>> {
    const model = await this.userModel.findOne({where: {id}});
    if(!model){
      throw new NotFoundException(UserEntity.NOT_FOUND)
    }
    return new ResponseOkDto(model);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseOkDto<User>> {
    const [,[model]] = await this.userModel.update( updateUserDto,{where: { id }, returning: true})
    if(!model){
      throw new NotFoundException(UserEntity.NOT_FOUND)
    }
    return  new ResponseOkDto(model);
  }

  remove(id: number): Promise<any> {
    return this.userModel.destroy({where: {id}}
    )
  }
}

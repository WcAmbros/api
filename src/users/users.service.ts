import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";
import {ResponseOkDto, ResponseOkListDto, PaginationOptionsDto, PaginationMetaDto} from "@app/json-api";

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
      try {
        throw new NotFoundException('Пользователь не найден')
      }catch (e) {
        console.log(e);
      }
    }
    return new ResponseOkDto(model);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseOkDto<User>> {
    const [,[model]] = await this.userModel.update( updateUserDto,{where: { id }, returning: true})
    return  new ResponseOkDto(model);
  }

  remove(id: number): Promise<any> {
    return this.userModel.destroy({where: {id}}
    )
  }
}

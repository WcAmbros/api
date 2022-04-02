import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User)
      private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
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

import {Column, CreatedAt, Default, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {IUserCreationAttrs} from "../intrefaces/user.interface";
import {ApiProperty} from "@nestjs/swagger";
import {DataTypes} from "sequelize";

@Table
export class User extends Model<User, IUserCreationAttrs>{
  @ApiProperty({example: 1})
  @Column({autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'user'})
  @Column
  login: string;

  @ApiProperty({example: 'Иван'})
  @Column
  firstName: string;

  @ApiProperty({example: 'Иванов'})
  @Column
  lastName: string;

  @ApiProperty({example: true})
  @Column({ defaultValue: true })
  isActive: boolean;

  @ApiProperty({example: '2022-04-02T11:13:08.011Z'})
  @CreatedAt
  @Column({ defaultValue: DataTypes.NOW })
  createdAt: Date;

  @ApiProperty({example: '2022-04-02T11:13:08.011Z'})
  @UpdatedAt
  @Column({ defaultValue: DataTypes.NOW })
  updatedAt: Date;
}

import {Column, CreatedAt, Default, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {IUserCreationAttrs} from "../intrefaces/user.interface";
import {ApiProperty} from "@nestjs/swagger";
import {DataTypes} from "sequelize";
import {UserExample} from "../../i18n/ru";

@Table
export class User extends Model<User, IUserCreationAttrs>{
  @ApiProperty(UserExample.ID)
  @Column({autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty(UserExample.LOGIN)
  @Column
  login: string;

  @ApiProperty(UserExample.FIRST_NAME)
  @Column
  firstName: string;

  @ApiProperty(UserExample.LAST_NAME)
  @Column
  lastName: string;

  @ApiProperty(UserExample.IS_ACTIVE)
  @Column({ defaultValue: true })
  isActive: boolean;

  @ApiProperty(UserExample.CREATED_AT)
  @CreatedAt
  @Column({ defaultValue: DataTypes.NOW })
  createdAt: Date;

  @ApiProperty(UserExample.UPDATED_AT)
  @UpdatedAt
  @Column({ defaultValue: DataTypes.NOW })
  updatedAt: Date;
}

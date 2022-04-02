import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  login: string;

  @Column({ allowNull: true })
  firstName: string;

  @Column({ allowNull: true})
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column({ defaultValue: new Date() })
  createAt: Date;

  @Column({ defaultValue: new Date() })
  updateAt: Date;
}

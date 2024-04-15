import { Model, DataType, DataTypes, Sequelize } from "sequelize";
import { connection } from "../instances/mysql";

export interface UsersLogin extends Model{
   id: number,
   name: string,
   email: string,
   password: string,
   token: string,
   allowable_level :number,
}

export const User = connection.define<UsersLogin>('users', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
    allowable_level: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'users_login',
    timestamps: true
})
import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface Employee extends Model {
    id: number,
    name: string,
    cpf: string,
    cel_phone: string,
}
export const Employee = connection.define<Employee> ('employees', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    cpf: {
        type: DataTypes.STRING,
    },
    cel_phone: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'employees',
    timestamps: true
})
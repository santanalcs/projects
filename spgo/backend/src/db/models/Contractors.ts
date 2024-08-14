import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface Contractor extends Model {
    id: number,
    name: string,
    type_person: string,
    cpf_cnpj: string,
}

export const Contractor = connection.define<Contractor>('contractors', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
    type_person: {
        type: DataTypes.STRING,
    },
    cpf_cnpj: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'contractors',
    timestamps: true
})
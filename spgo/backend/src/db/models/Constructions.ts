import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface Construction extends Model {
    id: number,
    pattern_type: string,
    owner: string,
    owner_cpf: string,
    owner_rg: string,
    liable_engineer: string,
    engineer_registration: string,
    area_m2: number,
    value_m2: number,
}

export const Construction = connection.define<Construction>('constructions', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    pattern_type: {
        type: DataTypes.STRING,
    },
    owner: {
        type: DataTypes.STRING,
    },
    owner_cpf: {
        type: DataTypes.STRING,
    },
    owner_rg: {
        type: DataTypes.STRING,
    },
    liable_engineer: {
        type: DataTypes.STRING,
    },
    engineer_registration: {
        type: DataTypes.STRING,
    },
    area_m2: {
        type: DataTypes.FLOAT,
    },
    value_m2: {
        type: DataTypes.FLOAT,
    },

}, {
    tableName: 'constructions',
    timestamps: true,
})
import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";
import { Group } from "./GroupsCriterions";

export interface MeasuresUnit extends Model {
    id: number,
    symbol: string,
    description: string,
    id_group_criterion: number,
}

export const Measure = connection.define<MeasuresUnit>('measures', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    symbol: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    id_group_criterion: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'measures_unit',
    timestamps: true
})

export const assGroupsCriterions = Group.hasMany(Measure, {
    constraints: true,
    foreignKey: 'id_group_criterion'
})
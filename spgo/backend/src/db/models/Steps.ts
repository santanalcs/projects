import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface Step extends Model {
    id: number,
    step: string,
}

export const Step = connection.define<Step>('steps', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    step: {
        type: DataTypes.STRING,
        }
    }, {
        tableName: 'steps',
        timestamps: true
})
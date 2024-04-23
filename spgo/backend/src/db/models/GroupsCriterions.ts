import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";

export interface GroupsCriterions extends Model {
    id: number,
    description: string,
}

export const Group = connection.define<GroupsCriterions>('groups', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'groups_criterions',
    timestamps: false})
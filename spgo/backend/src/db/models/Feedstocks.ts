import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";
import { Measure } from "./MeasuresUnit";

export interface Feedstocks extends Model {
    id: number,
    description: string,
    rating: string,
    id_measure_unit: number
}
export const Feedstock = connection.define<Feedstocks> ('feedstock', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.STRING,
    },
    id_measure_unit: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'feedstocks',
    timestamps: true
})

export const assMeasuresUnit = Feedstock.belongsTo(Measure, {
    constraints: true,
    foreignKey:'id_measure_unit'
})
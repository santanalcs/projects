import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";
import { Construction } from "./Constructions";

export interface ConstructionAddress extends Model {
    id: number,
    id_construction: number,
    address: string,
    district: string,
    zip_code: string,
    city: string,
    uf: string,
}

export const ConstructionAddress = connection.define<ConstructionAddress>('addresses', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    id_construction: {
        type: DataTypes.INTEGER,
    },
    address: {
        type: DataTypes.STRING,
    },
    district: {
        type: DataTypes.STRING,
    },
    zip_code: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    uf: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'constructions_addresses',
    timestamps: true
})

export const assConstructionsAddresses = Construction.hasMany(ConstructionAddress, {
    constraints: true,
    foreignKey:'id_construction'
})
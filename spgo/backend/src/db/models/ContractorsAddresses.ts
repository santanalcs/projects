import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";
import { Contractor } from "./Contractors";

export interface ContractorAddress extends Model {
    id: number,
    id_contractor: number,
    address: string,
    district: string,
    zip_code: string,
    city: string,
    uf: string,
}

export const ContractorAddress = connection.define<ContractorAddress>('addresses', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    id_contractor: {
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
    tableName: 'contractors_addresses',
    timestamps: true
})

export const assContractorsAddresses = Contractor.hasMany(ContractorAddress, {
    constraints: true,
    foreignKey:'id_contractor'
})
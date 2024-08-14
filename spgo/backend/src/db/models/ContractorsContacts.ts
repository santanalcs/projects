import { Model, DataTypes } from "sequelize";
import { connection } from "../instances/mysql";
import { Contractor } from "./Contractors";

export interface ContractorContact extends Model {
    id: number,
    id_contractor: number,
    contact: string,
    cel_phone: string,
    email: string,
}

export const ContractorContact = connection.define<ContractorContact>('contacts', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    id_contractor: {
        type: DataTypes.INTEGER,
    },
    contact: {
        type: DataTypes.STRING,
    },
    cel_phone: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.INTEGER,
    }
}, {
    tableName: 'contractors_contacts',
    timestamps: true
})

export const assContractorsContacts = Contractor.hasMany(ContractorContact, {
    constraints: true,
    foreignKey:'id_contractor'
})
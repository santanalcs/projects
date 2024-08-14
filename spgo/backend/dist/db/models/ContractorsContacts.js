"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assContractorsContacts = exports.ContractorContact = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Contractors_1 = require("./Contractors");
exports.ContractorContact = mysql_1.connection.define('contacts', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_contractor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    contact: {
        type: sequelize_1.DataTypes.STRING,
    },
    cel_phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'contractors_contacts',
    timestamps: true
});
exports.assContractorsContacts = Contractors_1.Contractor.hasMany(exports.ContractorContact, {
    constraints: true,
    foreignKey: 'id_contractor'
});

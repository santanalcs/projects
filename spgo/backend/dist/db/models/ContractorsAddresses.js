"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assContractorsAddresses = exports.ContractorAddress = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Contractors_1 = require("./Contractors");
exports.ContractorAddress = mysql_1.connection.define('addresses', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_contractor: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    district: {
        type: sequelize_1.DataTypes.STRING,
    },
    zip_code: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    uf: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'contractors_addresses',
    timestamps: true
});
exports.assContractorsAddresses = Contractors_1.Contractor.hasMany(exports.ContractorAddress, {
    constraints: true,
    foreignKey: 'id_contractor'
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assConstructionsAddresses = exports.ConstructionAddress = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const Constructions_1 = require("./Constructions");
exports.ConstructionAddress = mysql_1.connection.define('addresses', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_construction: {
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
    tableName: 'constructions_addresses',
    timestamps: true
});
exports.assConstructionsAddresses = Constructions_1.Construction.hasMany(exports.ConstructionAddress, {
    constraints: true,
    foreignKey: 'id_construction'
});

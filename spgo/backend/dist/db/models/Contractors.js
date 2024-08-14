"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contractor = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Contractor = mysql_1.connection.define('contractors', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    type_person: {
        type: sequelize_1.DataTypes.STRING,
    },
    cpf_cnpj: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'contractors',
    timestamps: true
});

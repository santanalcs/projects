"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Employee = mysql_1.connection.define('employee', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING,
    },
    cel_phone: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'employees',
    timestamps: true
});

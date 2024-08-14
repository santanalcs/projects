"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Step = mysql_1.connection.define('steps', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    step: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'steps',
    timestamps: true
});

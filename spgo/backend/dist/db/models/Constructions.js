"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Construction = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.Construction = mysql_1.connection.define('constructions', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    pattern_type: {
        type: sequelize_1.DataTypes.STRING,
    },
    owner: {
        type: sequelize_1.DataTypes.STRING,
    },
    owner_cpf: {
        type: sequelize_1.DataTypes.STRING,
    },
    owner_rg: {
        type: sequelize_1.DataTypes.STRING,
    },
    liable_engineer: {
        type: sequelize_1.DataTypes.STRING,
    },
    engineer_registration: {
        type: sequelize_1.DataTypes.STRING,
    },
    area_m2: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    value_m2: {
        type: sequelize_1.DataTypes.FLOAT,
    },
}, {
    tableName: 'constructions',
    timestamps: true,
});

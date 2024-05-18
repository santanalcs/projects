"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assMeasuresUnit = exports.Feedstock = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const MeasuresUnit_1 = require("./MeasuresUnit");
exports.Feedstock = mysql_1.connection.define('feedstock', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    rating: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_measure_unit: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'feedstocks',
    timestamps: true
});
exports.assMeasuresUnit = exports.Feedstock.belongsTo(MeasuresUnit_1.Measure, {
    constraints: true,
    foreignKey: 'id_measure_unit'
});

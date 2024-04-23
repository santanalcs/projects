"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assGroupsCriterions = exports.Measure = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
const GroupsCriterions_1 = require("./GroupsCriterions");
exports.Measure = mysql_1.connection.define('measures', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    symbol: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_group_criterion: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    tableName: 'measures_unit',
    timestamps: true
});
exports.assGroupsCriterions = GroupsCriterions_1.Group.hasMany(exports.Measure, {
    constraints: true,
    foreignKey: 'id_group_criterion'
});

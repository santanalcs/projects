"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.User = mysql_1.connection.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
    },
    allowable_level: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'users_login',
    timestamps: true
});

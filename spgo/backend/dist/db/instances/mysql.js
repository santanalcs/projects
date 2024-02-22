"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.connection = new sequelize_1.Sequelize(process.env.MSQL_DB, process.env.MSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    port: parseInt(process.env.MYSQL_PORT)
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouters_1 = __importDefault(require("./routers/userRouters"));
const authRouters_1 = __importDefault(require("./routers/authRouters"));
const unitRouters_1 = __importDefault(require("./routers/unitRouters"));
const feedstockRouters_1 = __importDefault(require("./routers/feedstockRouters"));
const employeeRouters_1 = __importDefault(require("./routers/employeeRouters"));
dotenv_1.default.config();
const server = (0, express_1.default)();
//server.use(cors());
server.use((0, cors_1.default)({
    origin: 'http://localhost:4200'
}));
server.use(express_1.default.static(path_1.default.join(__dirname, 'puclic')));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use([userRouters_1.default, authRouters_1.default, unitRouters_1.default, feedstockRouters_1.default, employeeRouters_1.default]);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado' });
});
server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});

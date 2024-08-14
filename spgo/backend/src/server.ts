import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import userRouters from "./routers/userRouters";
import authRouters from "./routers/authRouters";
import unitRouters from "./routers/unitRouters";
import feedstockRouters from "./routers/feedstockRouters"
import employeeRouters from "./routers/employeeRouters"
import contractorRouters from "./routers/contractorRouters";
import stepRouters from "./routers/stepRouters";
import constructionRouters from "./routers/constructionRouters";

dotenv.config();

const server = express();
//server.use(cors());
server.use(cors({
    origin: 'http://localhost:4200'
}));
server.use(express.static(path.join(__dirname, 'puclic')));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use(
    [
        userRouters, authRouters, unitRouters, feedstockRouters,
        employeeRouters, contractorRouters, stepRouters, constructionRouters
    ]
);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado'});
});

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
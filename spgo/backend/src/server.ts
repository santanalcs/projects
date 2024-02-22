import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.static(path.join(__dirname, 'puclic')));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
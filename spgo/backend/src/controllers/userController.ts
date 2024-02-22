import { Request, Response } from "express";

import { User } from "../db/models/UsersLogin";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const listUsers = async (req: Request, res: Response) => {
    let users = await User.findAll({order:[['id', 'ASC']]});

    if(users) {
        res.json({users})
    } else {
        res.json({ error: 'Sem cadastro!' });
    }
    
}
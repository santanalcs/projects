import { Request, Response } from "express";

import { Group } from "../db/models/GroupsCriterions";

export const listGroupsCriterion = async (req: Request, res: Response) => {
    let groups = await Group.findAll({order:[['id', 'ASC']]});

    if(groups) {
        res.json({groups});
    } else {
        res.json({ error:{msg:'Sem cadastro!'}});
    }
}

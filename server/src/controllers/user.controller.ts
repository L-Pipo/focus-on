import { Router, Response, Request } from "express";

import { ensureSameUser } from "../middlewares/guards";
import { usersService } from "../services/user.service";

export const usersRouter = Router();

// currently not used
// could use it for profile view to make it possible to see or change user info

usersRouter.get(
  "/:userId",
  ensureSameUser,
  async (req: Request, res: Response) => {
    let userId = req.params.userId;
    try {
      res.send(await usersService.getUser(userId));
    } catch (error: any) {
      res.status(error.status || 500).send();
    }
  }
);

import { Router, Request, Response } from "express";

import { authService } from "../services/auth.service";

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  let { username, password, email } = req.body;
  try {
    res.send(await authService.registerUser(username, password, email));
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  let { username, password } = req.body;
  try {
    res.send(await authService.loginUser(username, password));
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

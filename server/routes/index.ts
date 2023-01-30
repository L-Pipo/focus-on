import { Router, Response, Request } from "express";

export const indexRouter = Router();

indexRouter.get("/", function (req: Request, res: Response) {
  res.send({ title: "Express" });
});

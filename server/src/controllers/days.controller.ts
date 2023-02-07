import { Router, Response, Request } from "express";

import { daysService } from "../services/days.service";

export const daysRouter = Router();

daysRouter.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const days = await daysService.getAllDays(userId);
    res.send(days);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

daysRouter.get(
  "/:userId/currentday/:id",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const dayId = req.params.id;
    try {
      const days = await daysService.getOneDay(userId, dayId);
      res.send(days);
    } catch (error: any) {
      res.status(error.status || 500).send();
    }
  }
);

daysRouter.post("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const day = await daysService.addDay(userId);
    res.send(day);
  } catch (error: any) {
    res.status(error.status || 500).send();
  }
});

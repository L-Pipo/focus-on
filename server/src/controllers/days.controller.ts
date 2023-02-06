import { Router, Response, Request } from "express";

import { daysService } from "../services/days.service";

export const daysRouter = Router();

daysRouter.get("/:userId", (req: Request, res: Response) => {
  daysService
    .getAllDays(req.params.userId)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
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

daysRouter.post("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  // console.log(userId);
  daysService
    .addDay(userId)
    .then((data) => res.send(data))
    .catch((error) => res.status(error.status || 500).send());
});

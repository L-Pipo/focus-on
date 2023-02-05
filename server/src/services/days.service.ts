import { errorType } from "../controllers/helpers";
import { daysModel } from "../models/days.model";
import { Day } from "../types/day";

export const daysService = {
  async getAllDays(userId: any) : Promise<Day[]> {
    try {
      const day = await daysModel.getAllDays(userId);
      return day;
    } catch (error) {
      console.log(error);
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },

  async getOneDay(userId: any, dayId: any): Promise<Day> {
    try {
      const day = await daysModel.getOneDay(userId, dayId);
      return day;
    } catch (error) {
      console.log(error);
      return Promise.reject({
        status: errorType.NOT_FOUND,
        message: "Not found",
      });
    }
  },

  async addDay(userId: any) : Promise<Day> {
    let getDay = new Date();
    var dd = String(getDay.getDate()).padStart(2, "0");
    var mm = String(getDay.getMonth() + 1).padStart(2, "0");
    var yyyy = getDay.getFullYear();
    let today = dd + "." + mm + "." + yyyy;

    try {
      const day = await daysModel.addDay(userId, today);
      return day;
    }catch(error: any){
      return Promise.reject({
        status: errorType.BAD_REQUEST,
        message: "Day already exists",
      })
    }

    // return daysModel.addDay(userId, today).then((result) =>
    //   result === "Day exists!"
    //     ? Promise.reject({
    //         status: errorType.BAD_REQUEST,
    //         message: "Day already exists",
    //       })
    //     : daysModel.addDay(userId, today)
    // );
  },
};

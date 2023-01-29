import { Pomodoro } from "./pomodoro"
import { Task } from "./task"

export interface Day {
    date: string,
    id: number,
    user_id: number,
    tasks?: Task[],
    sessions?: Pomodoro[]
}
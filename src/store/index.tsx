import { types } from "mobx-state-tree";
import { eventLog } from "./models/eventLog";

const Store = types.model("Store", {
  eventLog: types.optional(eventLog, {})
});

const newDate = new Date();
const localTime =
  newDate.getFullYear() +
  "-" +
  (newDate.getMonth() + 1) +
  "-" +
  newDate.getDate() +
  " " +
  newDate.getHours() +
  ":" +
  newDate.getMinutes() +
  ":" +
  newDate.getSeconds();

const hour = new Date(newDate.getTime() - 1000 * 60 * 60);
const lastHour =
  hour.getFullYear() +
  "-" +
  (hour.getMonth() + 1) +
  "-" +
  hour.getDate() +
  " " +
  hour.getHours() +
  ":" +
  hour.getMinutes() +
  ":" +
  hour.getSeconds();

export type IStore = typeof Store.Type;

export const store = Store.create({
  eventLog: {
    localTime: localTime,
    lastHour: lastHour
  }
}) as IStore;

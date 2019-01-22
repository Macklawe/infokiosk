import { types } from "mobx-state-tree";
import { dataItem, IDataItem } from "./data";

export const eventLog = types
  .model("eventLog", {
    data: types.optional(types.array(dataItem), []),
    localTime: types.optional(types.string, ""),
    lastHour: types.optional(types.string, "")
  })
  .actions(self => ({
    setData: (data: Array<IDataItem>) => {
      data.map(item => {
        self.data.push(item);
      });
    }
  }));

export type IEventLog = typeof eventLog.Type;

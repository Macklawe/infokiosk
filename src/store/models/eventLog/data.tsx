import { types } from "mobx-state-tree";

export const dataItem = types.model("dataItem", {
  afroamerican: types.number,
  age: types.number,
  asianindian: types.number,
  camera_id: types.number,
  caucasian: types.number,
  distance: types.number,
  eastasian: types.number,
  event_time: types.string,
  id: types.number,
  image_ref: types.string,
  latino: types.number,
  male: types.number,
  person_id: types.number,
  pitch: types.number,
  roll: types.number,
  similarity: types.number,
  yaw: types.number
});
export type IDataItem = typeof dataItem.Type;

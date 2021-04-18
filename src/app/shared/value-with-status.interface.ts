import { Status } from "./status.enum";

export interface ValueWithStatus<T> {
  value: T;
  status: Status;
}

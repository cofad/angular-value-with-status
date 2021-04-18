import { Status } from "./status.enum";

export interface ValueWithStatus<T> {
  readonly value: Readonly<T>;
  readonly status: Status;
}

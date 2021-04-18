import { Status } from "../enums/status";

export type ValueWithStatus<T> {
  readonly value: Readonly<T>;
  readonly status: Status;
}

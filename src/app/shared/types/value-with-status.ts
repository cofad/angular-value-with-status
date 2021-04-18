import { Status } from "./status.enum";

export type ValueWithStatus<T> {
  readonly value: Readonly<T>;
  readonly status: Status;
}

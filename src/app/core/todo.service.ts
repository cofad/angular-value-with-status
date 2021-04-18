import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { DeepReadonly } from "ts-essentials";
import { Status } from "../shared/status.enum";
import { Todo } from "../shared/todo.interface";
import { ValueWithStatus } from "../shared/value-with-status.interface";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todos$ = new BehaviorSubject<DeepReadonly<ValueWithStatus<Todo[]>>>({
    value: [],
    status: Status.Initialized
  });

  constructor(private http: HttpClient) {}

  public getTodos$(): BehaviorSubject<DeepReadonly<ValueWithStatus<Todo[]>>> {
    return this.todos$;
  }

  public loadTodos(): void {
    this.todos$.next({ value: [], status: Status.Loading });

    this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .subscribe(
        todos => {
          this.todos$.next({ value: todos, status: Status.Loaded });
        },
        error => {
          console.error("Error loading todos", error);
          this.todos$.next({ value: [], status: Status.Error });
        }
      );
  }
}

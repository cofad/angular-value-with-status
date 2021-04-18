import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Status } from "../shared/enums/status.enum";
import { Todo } from "./todo.type";
import { ValueWithStatus } from "../shared/types/value-with-status.type";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todos$ = new BehaviorSubject<Readonly<ValueWithStatus<Todo[]>>>({
    value: [],
    status: Status.Initialized
  });

  constructor(private http: HttpClient) {}

  public getTodos$(): BehaviorSubject<Readonly<ValueWithStatus<Todo[]>>> {
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

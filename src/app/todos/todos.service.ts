import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Status } from "../shared/enums/status.enum";
import { Todo } from "./todo.type";
import { ValueWithStatus } from "../shared/types/value-with-status.type";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private readonly todos$ = new BehaviorSubject<
    Readonly<ValueWithStatus<Todo[]>>
  >({
    value: [],
    status: Status.Initialized
  });

  constructor(private http: HttpClient) {}

  public getTodos$(): BehaviorSubject<Readonly<ValueWithStatus<Todo[]>>> {
    return this.todos$;
  }

  public loadTodos$(): Observable<Readonly<ValueWithStatus<Todo[]>>> {
    this.todos$.next({ value: [], status: Status.Loading });

    return this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .pipe(
        map<Todo[], ValueWithStatus<Todo[]>>(todos => {
          return { value: todos, status: Status.Loaded };
        }),
        tap(todos => this.todos$.next(todos)),
        catchError(error => {
          console.error(error);
          this.todos$.next({ value: [], status: Status.Error });
          return throwError(error);
        })
      );
  }
}

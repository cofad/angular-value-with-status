import { Component, OnInit } from "@angular/core";
import { Status } from "./shared/enums/status";
import { TodoService } from "./todos/todo.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public readonly Status = Status;
  public readonly todos$ = this.todoService.getTodos$();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.loadTodos();
  }
}

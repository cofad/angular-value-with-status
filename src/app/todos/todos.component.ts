import { Component, OnInit } from "@angular/core";
import { Status } from "../shared/enums/status.enum";
import { TodoService } from "./todo.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  public readonly Status = Status;
  public readonly todos$ = this.todoService.getTodos$();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.loadTodos();
  }
}

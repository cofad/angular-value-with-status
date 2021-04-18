import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { TodosModule } from "./todos/todos.module";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, TodosModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

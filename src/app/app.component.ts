import { Component, OnInit, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TodoService } from './services/todo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatRadioButton } from '@angular/material/radio';
import { Todo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = ['status', 'title', 'delete'];
  newTodoText = '';
  dataSource: any;
  selection = new SelectionModel<Todo>(true, []);
  private remain: number;

  constructor(private todoService: TodoService, private zone: NgZone) {
    zone.onMicrotaskEmpty.subscribe(() => { console.log('detect change'); });
  }

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => {
      this.dataSource = new MatTableDataSource<Todo>(todos.data);
      this.remain = todos.remain;
    });

    this.todoService.getAllTodos();
  }

  toggleCompletion(todo: Todo): void {
    this.todoService.toggleCompletion(todo);
  }

  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  removeTodo(todo: Todo): void {
    this.todoService.remove(todo);
  }

  changeFilter($event: { source: MatRadioButton, value: any }): void {
    const filterType = $event.value.toString();

    switch (filterType) {
      case 'active':
        this.todoService.getRemainingTodos();
        break;
      case 'completed':
        this.todoService.getCompletedTodos();
        break;
      default:
        this.todoService.getAllTodos();
    }
  }

  removeCompletedTodos(): void {
    this.todoService.removeCompletedAll();
  }
}

import { Component, OnInit, /*NgZone*/ } from '@angular/core';
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
  private todos: Todo[];
  private filterType: string;

  constructor(private todoService: TodoService, /*private zone: NgZone*/) {
    // zone.onMicrotaskEmpty.subscribe(() => { console.log('detect change'); });
  }

  ngOnInit() {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
      this.dataSource = new MatTableDataSource<Todo>(this.todos);
      this.applyFilter();
    });

    this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
    }
  }

  getCompleted(): Todo[] {
    return this.completedFilter(true);
  }

  getRemaining(): Todo[] {
    return this.completedFilter(false);
  }

  completedFilter(status): Todo[] {
    return this.todos.filter((todo: Todo) => todo.completed === status);
  }

  changeFilter($event: { source: MatRadioButton, value: any }): void {
    this.filterType = $event.value.toString();
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filterType) {
      case 'all':
        this.dataSource = new MatTableDataSource<Todo>(this.todos);
        break;
      case 'active':
        this.dataSource = new MatTableDataSource<Todo>(this.getRemaining());
        break;
      case 'completed':
        this.dataSource = new MatTableDataSource<Todo>(this.getCompleted());
        break;
      default:
    }
  }

  removeTodo(todo: Todo): void {
    this.todoService.remove(todo);
  }

  removeCompletedTodo(): void {
    this.todoService.removeCompleted();
  }

  toggleCompletion(todo: Todo): void {
    this.todoService.toggleCompletion(todo);
  }
}

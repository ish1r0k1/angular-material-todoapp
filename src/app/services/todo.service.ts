import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../models';

@Injectable()
export class TodoService {
  private todosObserver: any;
  private MY_STORAGE_KEY = 'angular-todo';

  todos$: Observable<Todo[]>;

  constructor() {
    this.todos$ = new Observable(observer => {
      this.todosObserver = observer;
    });
  }

  private fetchTodos() {
    return JSON.parse(localStorage.getItem(this.MY_STORAGE_KEY)) || [];
  }

  getTodos() {
    this.todosObserver.next(this.fetchTodos());
  }

  add(title: string) {
    const todos = this.fetchTodos().concat(new Todo(title));
    localStorage.setItem(this.MY_STORAGE_KEY, JSON.stringify(todos));
    this.todosObserver.next(this.fetchTodos());
  }

  remove(todo: Todo) {
    const todos = this.fetchTodos();
    const filteredTodos = todos.filter((_todo) => {
      return _todo.id !== todo.id;
    });
    localStorage.setItem(this.MY_STORAGE_KEY, JSON.stringify(filteredTodos));
    this.todosObserver.next(this.fetchTodos());
  }

  removeCompleted() {
    const uncompletedTodos = this.fetchTodos().filter((todo: Todo) => todo.completed !== true);
    localStorage.setItem(this.MY_STORAGE_KEY, JSON.stringify(uncompletedTodos));
    this.todosObserver.next(this.fetchTodos());
  }

  toggleCompletion(todo: Todo) {
    const todos = this.fetchTodos();
    const filteredTodo = todos.filter(_todo => {
      return _todo.id === todo.id;
    })[0];
    filteredTodo.completed = !filteredTodo.completed;

    localStorage.setItem(this.MY_STORAGE_KEY, JSON.stringify(todos));
    this.todosObserver.next(this.fetchTodos());
  }
}

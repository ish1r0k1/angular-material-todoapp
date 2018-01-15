import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../models';

@Injectable()
export class TodoService {
  private todosObserver: any;
  private MY_STORAGE_KEY = 'angular-todo';
  private latestGetFunc: Function;

  todos$: Observable<{remain: number, data: Todo[]}>;

  constructor() {
    this.todos$ = new Observable(observer => {
      this.todosObserver = observer;
    });
  }

  private fetchTodos() {
    return JSON.parse(localStorage.getItem(this.MY_STORAGE_KEY)) || [];
  }

  private fetchTodosWithCompleted(completed: Boolean) {
    return this.fetchTodos().filter((todo: Todo) => todo.completed === completed);
  }

  private updateTodos(todos: Todo[]) {
    localStorage.setItem(this.MY_STORAGE_KEY, JSON.stringify(todos));
    this.latestGetFunc();
  }

  private getRemain(): number {
    return this.fetchTodosWithCompleted(false).length;
  }

  private updateObserver(todos) {
    this.todosObserver.next({
      remain: this.getRemain(),
      data: todos
    });
  }

  getAllTodos() {
    this.updateObserver(this.fetchTodos());
    this.latestGetFunc = this.getAllTodos;
  }

  getRemainingTodos() {
    this.updateObserver(this.fetchTodosWithCompleted(false));
    this.latestGetFunc = this.getRemainingTodos;
  }

  getCompletedTodos() {
    this.updateObserver(this.fetchTodosWithCompleted(true));
    this.latestGetFunc = this.getCompletedTodos;
  }

  toggleCompletion(todo: Todo) {
    const todos = this.fetchTodos();
    const targetTodo = todos.filter(_todo => {
      return _todo.id === todo.id;
    })[0];
    targetTodo.completed = !targetTodo.completed;
    this.updateTodos(todos);
  }

  add(title: string) {
    const todos = this.fetchTodos().concat(new Todo(title));
    this.updateTodos(todos);
  }

  remove(todo: Todo) {
    const filteredTodos = this.fetchTodos().filter(_todo => {
      return _todo.id !== todo.id;
    });
    this.updateTodos(filteredTodos);
  }

  removeCompletedAll() {
    this.updateTodos(this.fetchTodosWithCompleted(false));
  }
}

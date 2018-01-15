import * as uuidv1 from 'uuid/v1';

export class Todo {
  id: string;
  completed: Boolean;
  editing: Boolean;

  private _title: string;

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value.trim();
  }

  constructor(title: string) {
    this.id = uuidv1();
    this.completed = false;
    this.editing = false;
    this._title = title.trim();
  }
}

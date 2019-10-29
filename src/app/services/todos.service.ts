import {Injectable, NgZone} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {MeteorObservable} from 'meteor-rxjs';
import {debounce, share} from 'rxjs/operators';
import {Todo} from '../../../api/imports/models/todo.model';
import {Todos} from '../../../api/imports/collections/todos';
import {MethodObservable} from '../../../api/imports/other/method-observable';
import {addTodo, finishTodo} from '../../../api/imports/methods';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos$: Observable<Todo[]> = Todos.find({}).pipe(debounce(() => timer(50)));

  constructor() {
    MeteorObservable.subscribe('todos').subscribe();
    this.todos$.subscribe((items) => {
      // When I subscribe here, the subscription in todos.components will
      // emit when adding or changing items. Otherwise not. Why???
      // as well, otherwise not.
     // console.log('todos', items.length);
    });
  }

  addTodo(todo: Todo): Observable<any> {
   return MethodObservable(addTodo, todo).pipe(share());
  }

  finishTodo(todoId: string): Observable<any> {
    return MethodObservable(finishTodo, {todoId}).pipe(share());
  }

}

import {Component, OnInit} from '@angular/core';
import {TodosService} from '../../services/todos.service';
import {Todo} from '../../../../api/imports/models/todo.model';
import {User} from '../../../../api/imports/models/user.model';
import {AuthService} from '../../services/auth.service';
import {UsersService} from '../../services/users.service';
import {ComponentBase} from '../../component-base';
import {combineLatest, timer} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {DisplayUser} from '../users/users.component';
import {TodoStatus} from '../../../../api/imports/types/todo-status';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent extends ComponentBase implements OnInit {

  todos: Todo[];
  currentUser: User;
  users: User[];
  todoStatus = TodoStatus;

  constructor(
    private todosService: TodosService,
    private authService: AuthService,
    private usersService: UsersService
  ) {
    super();
    this.subscriptions.push(
      combineLatest(
        todosService.todos$,
        authService.currentUser$,
        usersService.users$
      ).pipe().subscribe(([todos, currentUser, users]) => {
        if (currentUser) {
          this.todos = todos;
          this.currentUser = currentUser;
          this.users = users;
        }
      })
    );
  }

  ngOnInit() {
  }

  getAssignee(userId) {
    if (this.currentUser._id === userId) {
      return 'me';
    } else {
      const user = this.users.find(u => u._id === userId);
      if (user) {
        return user.name || user.emails[0].address;
      }
    }
  }

  finish(id) {
    this.todosService.finishTodo(id)
      .subscribe(() => {
      }, (error) => {
        console.log(error);
        alert(`${error.error}: ${error.details}`);
      });
  }

}

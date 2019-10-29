import { Component, OnInit } from '@angular/core';
import {User} from '../../../../api/imports/models/user.model';
import {Todo} from '../../../../api/imports/models/todo.model';
import {Organisation} from '../../../../api/imports/models/organisation.model';
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  model = new Todo();
  busy = false;
  error = '';

  constructor(
    private todosService: TodosService
  ) { }

  ngOnInit() {
  }

  add() {
    this.busy = true;
    this.error = '';
    this.todosService.addTodo(this.model)
      .subscribe(() => {
        this.model = new Todo();
        this.busy = false;
      }, (error) => {
        console.log(error);
        this.error = `${error.error}: ${error.details}`;
        this.busy = false;
      });
  }

}

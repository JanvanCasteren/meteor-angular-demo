import {checkEditor} from '../helpers/authorisation-helpers';
import {Todo} from '../models/todo.model';
import {Users} from '../collections/users';
import {insertValidator} from '../validators/schema-validator';
import {Todos, TodosSchema} from '../collections/todos';
import {TodoStatus} from '../types/todo-status';
import {checkString} from '../helpers/validation-helpers';

const todoInsertValidator = insertValidator(TodosSchema);

export const addTodo = new ValidatedMethod({
  name: 'todos.add',
  validate: todoInsertValidator,
  run(todo: Todo) {
    console.log('todo.add');
    checkEditor(this.userId);
    const user = Users.collection.findOne({_id: this.userId});
    todo.userId = user._id;
    todo.organisationId = user.organisationId;
    todo.createdDate = new Date().toISOString();
    todo.modifiedDate = todo.createdDate;
    return Todos.collection.insert(todo);
  }
});

export const finishTodo = new ValidatedMethod({
  name: 'todos.finish',
  validate: null,
  run({todoId}) {
    checkString(todoId);
    checkEditor(this.userId);
    const todo = Todos.collection.findOne({_id: todoId});
    if (todo.userId !== this.userId) {
      throw new Meteor.Error('access denied');
    }
    todo.status = TodoStatus.Done;
    return Todos.collection.update(todoId, {
      $set: {
        status: TodoStatus.Done,
        modifiedDate: new Date().toISOString()
      }
    });
  }
});

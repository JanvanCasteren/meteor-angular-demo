import {TodoStatus} from '../types/todo-status';

export class Todo {
  _id?: string;
  description: string;
  userId: string;
  organisationId: string;
  status: TodoStatus = TodoStatus.Pending;
  createdDate?: string; // not localised ISO string
  modifiedDate?: string; // not localised ISO string
}

import {MongoObservable} from 'meteor-rxjs';
import {Todo} from "../models/todo.model";

const collection: Mongo.Collection<Todo> = new Mongo.Collection('todos');
if (Meteor.isServer) {
  collection.rawCollection().ensureIndex({organisationId: 1});
  collection.rawCollection().ensureIndex({organisationId: 1, description: 1}, {unique: true});
}
export const Todos = new MongoObservable.Collection<Todo>(collection);

export const TodosSchema = {
  'id': 'Todo',
  'type': 'object',
  'properties': {
    _id: {
      'type': 'string'
    },
    description: {
      'type': 'string',
      'maxLength': 100
    },
    userId: {
      'type': 'string'
    },
    organisationId: {
      'type': 'string'
    },
    status: {
      'type': 'string'
    },
    createdDate: {
      'type': 'string',
      'format': 'date-time',
    },
    modifiedDate: {
      'type': 'string',
      'format': 'date-time',
    },
  },
  'required': [
    'description',
    'status',
  ],
  'additionalProperties': false
};

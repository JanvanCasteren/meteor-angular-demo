import {ObservableCursor} from 'meteor-rxjs';
import {Users} from '../../../imports/collections/users';
import {Roles} from 'meteor/alanning:roles';
import {UserRoles} from '../../../imports/types/user-roles';
import {User} from '../../../imports/models/user.model';
import {Organisations} from '../../../imports/collections/organisations';
import {Organisation} from '../../../imports/models/organisation.model';
import {Todos} from '../../../imports/collections/todos';
import {Todo} from '../../../imports/models/todo.model';

function isAdmin(userId) {
  return Roles.userIsInRole(userId, UserRoles.Admin);
}

Meteor.publish('users', function (): ObservableCursor<User> {
  if (isAdmin(this.userId)) {
    return Users.find({}, {
      fields: {
        'roles': 1,
        'userType': 1,
        'emails': 1,
        'name': 1,
        'organisationId': 1
      }
    });
  } else {
    if (this.userId) {
      const user: User = Users.collection.findOne({_id: this.userId});
      return Users.find({
          organisationId: user.organisationId
        },
        {
          fields: {
            'emails': 1,
            'name': 1
          }
        });
    } else {
      return null;
    }
  }
});

Meteor.publish('organisations', function (): ObservableCursor<Organisation> {
  if (isAdmin(this.userId)) {
    return Organisations.find({});
  } else {
    if (this.userId) {
      const user: User = Users.collection.findOne({_id: this.userId});
      return Organisations.find({
        _id: user.organisationId
      });
    } else {
      return null;
    }
  }
});

Meteor.publish('todos', function (): ObservableCursor<Todo> {
  if (isAdmin(this.userId)) {
    return Todos.find({},
      {
        fields: {
          'organisationId': 1,
          'status': 1
        }
      });
  } else {
    if (this.userId) {
      const user: User = Users.collection.findOne({_id: this.userId});
      return Todos.find({
        organisationId: user.organisationId
      }, {sort: {createdDate: -1}});
    } else {
      return null;
    }
  }
});

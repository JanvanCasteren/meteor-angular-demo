import {MongoObservable} from 'meteor-rxjs';
import {Organisation} from '../models/organisation.model';

const collection: Mongo.Collection<Organisation> = new Mongo.Collection('organisations');
if (Meteor.isServer) {
  collection.rawCollection().ensureIndex({name: 1}, {unique: true});
}
export const Organisations = new MongoObservable.Collection<Organisation>(collection);

export const OrganisationSchema = {
  'id': 'Organisation',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'string'
    },
    'name': {
      'type': 'string',
      'maxLength': 15
    },
  },
  'required': [
    'name',
  ],
  'additionalProperties': false
};

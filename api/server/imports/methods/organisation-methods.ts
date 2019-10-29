import {Meteor} from 'meteor/meteor';
import {insertValidator, updateValidator} from '../../../imports/validators/schema-validator';
import {Organisation} from '../../../imports/models/organisation.model';
import {Organisations, OrganisationSchema} from '../../../imports/collections/organisations';
import {checkAdmin} from '../../../imports/helpers/authorisation-helpers';
import {Users} from '../../../imports/collections/users';
import {checkString} from '../../../imports/helpers/validation-helpers';

const organisationInsertValidator = insertValidator(OrganisationSchema);
const organisationUpdateValidator = updateValidator(OrganisationSchema);

function addOrganisation(obj: Organisation) {
  organisationInsertValidator(obj);
 return Organisations.collection.insert(obj);
}

function updateOrganisation(obj: Organisation) {
  organisationUpdateValidator(obj);
  return Organisations.collection.update(obj._id, {$set: obj});
}

function removeOrganisation(id: string) {
  if(Users.collection.find({organisationId: id}).count() > 0) {
    throw new Meteor.Error('not allowed', 'only organisations without users can be removed');
  }
  Organisations.remove({_id: id});
}

Meteor.methods({
  'organisations.add'(organisation) {
    checkAdmin(this.userId);
    return addOrganisation(organisation);
  },
  'organisations.update'(organisation) {
    checkAdmin(this.userId);
    return updateOrganisation(organisation);
  },
  'organisations.remove'(organisationId) {
    checkString(organisationId);
    checkAdmin(this.userId);
    return removeOrganisation(organisationId);
  }
});


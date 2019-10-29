import StubCollections from 'meteor/hwillson:stub-collections';
import {Users} from '../collections/users';
import {NewUser} from '../models/new-user.model';
import {expect} from 'chai';
import {UserTypes} from "../types/user-types";
import {checkEditor, checkUser, getUserDescription} from "./authorisation-helpers";
import {addUser} from "../methods/users-methods";
import {createRoles} from "../../server/imports/services/users.service";

const organisationId = 'sF57N7rTKqRP7RYLD';
const otherOrganisationId = 'serDFDFsdfwe';

describe('Authorisation helper functions', function() {

  createRoles();

  const editorNewUser: NewUser = {
    email: 'editor@somewhere.nl',
    password: 'mysecret37code',
    organisationId: organisationId,
    userType: UserTypes.Editor,
    profile: {
      name: 'John Doe'
    }
  };

  const otherEditorNewUser: NewUser = {
    email: 'otherEditor@somewhere.nl',
    password: 'mysecret37code',
    organisationId: otherOrganisationId,
    userType: UserTypes.Editor,
    profile: {
      name: 'Jane Roe'
    }
  };

  const viewerNewUser: NewUser = {
    email: 'viewer@somewhere.nl',
    password: 'mysecret37code',
    organisationId: organisationId,
    userType: UserTypes.Viewer
  };

  let editorId;
  let otherEditorId;
  let viewerId;
  let editor;
  let otherEditor;
  let viewer;

  beforeEach(function() {
    StubCollections.stub([
      Users.collection,
    ]);
    editorId = addUser(editorNewUser, UserTypes.Editor);
    otherEditorId = addUser(otherEditorNewUser, UserTypes.Editor);
    viewerId = addUser(viewerNewUser, UserTypes.Viewer);
    editor = Users.collection.findOne({_id: editorId});
    otherEditor = Users.collection.findOne({_id: otherEditorId});
    viewer = Users.collection.findOne({_id: viewerId});
  });

  afterEach(function() {
    StubCollections.restore();
  });

  it('getUserDescription should return the correct value', function() {
    expect(getUserDescription(editor)).to.equal('John Doe');
    expect(getUserDescription(otherEditor)).to.equal('Jane Roe');
    expect(getUserDescription(viewer)).to.equal('viewer@somewhere.nl');
  });

  it('checkEditor should throw exception for a viewer', function() {
    expect(function() { checkEditor(viewerId); }).to.throw();
  });

  it('checkEditor should NOT throw exception for an editor', function() {
    expect(function() { checkEditor(editorId); }).to.not.throw();
  });

  it('checkUser should throw when user does not exist', function() {
    expect(function() { checkUser('blahblah'); }).to.throw();
  });

  it('checkUser should throw when user does not belong to given organisationId', function() {
    expect(function() { checkUser(editorId, otherOrganisationId); }).to.throw();
  });

  it('checkUser should return user when correct organisationId is passed', function() {
    const user = checkUser(editorId, organisationId);
    expect(user._id).to.equal(editorId);
  });

});

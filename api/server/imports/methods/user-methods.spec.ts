import {} from 'mocha';
import {expect} from 'chai';
import StubCollections from 'meteor/hwillson:stub-collections';
import {addUser} from './users-methods';
import {Users} from '../../../imports/collections/users';
import {Roles} from 'meteor/alanning:roles';
import {UserRoles} from '../../../imports/types/user-roles';
import {UserTypes} from '../../../imports/types/user-types';
import {NewUser} from '../../../imports/models/new-user.model';

describe('User functions', function () {

    beforeEach(function () {
        StubCollections.stub([
            Users.collection,
        ]);
    });

    afterEach(function () {
        StubCollections.restore();
    });

    describe('Add user', function () {

        const adminUser: NewUser = {
            email: 'admin@somewhere.nl',
            password: 'mysecret37code',
            userType: UserTypes.Admin
        };

        const editorUser = {
            email: 'editor@somewhere.nl',
            password: 'mysecret37code',
            userType: UserTypes.Editor
        };

        let adminId;
        let editorId;

        beforeEach(function () {
            adminId = addUser(adminUser, UserTypes.Admin);
            editorId = addUser(editorUser, UserTypes.Editor);
        });

        it('should have added the admin user to the Users collection', function () {
            const user = Users.collection.findOne({_id: adminId});
            expect(user.emails[0].address).to.equal(adminUser.email);
        });

        it('should have added the editor user to the Users collection', function () {
            const user = Users.collection.findOne({_id: editorId});
            expect(user.emails[0].address).to.equal(editorUser.email);
        });

        it('should have given the admin user the admin, editor and viewer role', function () {
            const user = Users.collection.findOne({_id: adminId});
            expect(Roles.userIsInRole(user, UserRoles.Admin)).to.be.true;
            expect(Roles.userIsInRole(user, UserRoles.Editor)).to.be.true;
            expect(Roles.userIsInRole(user, UserRoles.Viewer)).to.be.true;
        });

        it('should have given the editor user the editor and viewer role, and NOT the admin role', function () {
            const user = Users.collection.findOne({_id: editorId});
            expect(Roles.userIsInRole(user, UserRoles.Editor)).to.be.true;
            expect(Roles.userIsInRole(user, UserRoles.Viewer)).to.be.true;
            expect(Roles.userIsInRole(user, UserRoles.Admin)).to.be.false;
        });

    });

});

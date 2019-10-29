declare module 'meteor/hwillson:stub-collections' {
    module StubCollections {
        function stub(o: any);
        function restore();
    }

    export default StubCollections;
}

declare module 'meteor/alanning:roles' {
    interface RolesDAO {
        _id?: string;
        name?: string;
    }

    module Roles {
        function createRole(roleName: string, options: object): string;

        function deleteRole(roleName: string): void;

        function addUsersToRoles(users: any, roles: any, groups?: string): void;

        function removeUsersFromRoles(users: any, roles: any): void;

        // User can be user ID or user object.
        function userIsInRole(user: any, roles: any): boolean;

        function getRolesForUser(userId: string): string[];

        function getAllRoles(): Mongo.Cursor<RolesDAO>;

        function getUsersInRole(roleName: string): Mongo.Cursor<RolesDAO>;

        var GLOBAL_GROUP: string;
    }
}

interface ValidatedMethod_Static {
  new(options: {
    name: string;
    mixins?: Function[];
    validate: (args: { [key: string]: any; }) => boolean; // returned from SimpleSchemaInstance.validator() method;
    applyOptions?: {
      noRetry: boolean;
      returnStubValue: boolean;
      throwStubExceptions: boolean;
      onResultReceived: (result: any) => void;
      [key: string]: any };
    run: (args: { [key: string]: any; }) => void;
  }): ValidatedMethod_Instance;
}

interface ValidatedMethod_Instance {
  call(args: { [key: string]: any; }, cb?: (error: any, result: any) => void ): void;
  _execute(context: { [key: string]: any; }, args: { [key: string]: any; }): void;
}

declare const ValidatedMethod: ValidatedMethod_Static;

declare module 'meteor/mdg:validated-method' {
  export const ValidatedMethod: ValidatedMethod_Static;
}

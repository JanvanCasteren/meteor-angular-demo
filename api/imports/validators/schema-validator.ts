import {Validator} from 'jsonschema';

/**
 * Validates agains a given json-schema
 * Throws a Meteor Error when there are validation
 * Errors
 * @param schema
 * @returns {Function}
 * TODO: switch to ajv, which should be much faster
 * and is much more popular
 * see: https://www.npmjs.com/package/ajv
 */
export const insertValidator = function (schema) {
    return function (obj): any {
        const v = new Validator();

        const result = v.validate(obj, schema);
        if (result.errors.length !== 0) {
            // taken from simple schema
            // see https://github.com/aldeed/node-simple-schema/blob/
            // cfab13cb2f8c3cb73305d800652f7e9ea513368e/README.md
            // #customize-the-error-that-is-thrown (one line)
            // take first error message
            let schemaName = '';
            if (schema.id) {
                schemaName = 'Schema ' + schema.id + ': ';
            }
            const error = new Meteor.Error(result.errors[0].message);
            error.error = 'validation-error';
            error.details = schemaName + result.errors[0].toString();
            throw error;
        }
    };
};

export const updateValidator = function (schema) {
    return function (obj): any {
        // id must be provided
        if (typeof obj._id !== 'string') {
            throw new Meteor.Error('no _id supplied');
        }

        const v = new Validator();
        const result = v.validate(obj, schema);

        if (result.errors.length !== 0) {
            let schemaName = '';
            if (schema.id) {
                schemaName = 'Schema ' + schema.id + ': ';
            }
            const error = new Meteor.Error(result.errors[0].message);
            error.error = 'validation-error';
            error.details = schemaName + result.errors[0].toString();
            throw error;
        }
    };
};

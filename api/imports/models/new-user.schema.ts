export const NewUserSchema = {
  'type': 'object',
  'properties': {
    'organisationId': {
      type: 'string',
      minLength: 1 // not empty
    },
    'name': {
      'type': 'string',
      'maxLength': 128
    },
    'userType': {
      'type': 'string',
      'enum': ['Editor', 'Viewer']
    },
    'email': {
      'type': 'string',
      'format': 'email'
    },
    'password': {
      type: 'string'
    }
  },
  'required': ['email', 'password', 'userType', 'organisationId'],
  'additionalProperties': false
};

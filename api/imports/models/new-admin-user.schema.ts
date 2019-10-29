export const NewAdminUserSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string',
      'maxLength': 128
    },
    'userType': {
      'type': 'string',
      'enum': ['Admin']
    },
    'email': {
      'type': 'string',
      'format': 'email'
    },
    'password': {
      type: 'string'
    }
  },
  'required': ['email', 'password', 'userType'],
  'additionalProperties': false
};

export function checkString(value) {
  if (!(typeof value === 'string' || value instanceof String)) {
    throw new Meteor.Error('string parameter expected');
  }
}


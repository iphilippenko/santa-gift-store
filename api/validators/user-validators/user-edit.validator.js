const ajv = require('ajv')({$data: true});
require('ajv-keywords')(ajv);

const schema = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        email: {
            'type': 'string',
            'pattern': '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
        },
        phone: {
            'type': 'string',
            'pattern': '^\\+?3?8?(0\\d{9})$'
        },
        role: {
            'type': 'string'
        },
        password: {
            'type': 'string',
            'minLength': 2
        }
    },
    required: [],
    additionalProperties: false
};

module.exports = ajv.compile(schema);

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
            'pattern': '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$'
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
            'minLength': 6
        }
    },
    required: [],
    additionalProperties: false
};

module.exports = ajv.compile(schema);

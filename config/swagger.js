// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
    },
    apis: ['./controllers/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };

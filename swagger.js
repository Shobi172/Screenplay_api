const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Screenplay API',
      version: '1.0.0',
      description: 'API to manage characters, relations, and properties in a screenplay',
    },
    servers: [
      {
        url: 'http://localhost:5000', 
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };

import swaggerJsdoc from 'swagger-jsdoc';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 30000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for API',
    },
    servers: [
      {
        url: `${host}:${port}`,
        description: 'Base URL',
      },
    ],
  },
  apis: ['../routers/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;

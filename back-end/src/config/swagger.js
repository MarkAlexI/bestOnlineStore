import swaggerJsdoc from 'swagger-jsdoc';

const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 30000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for API of Lykke Store',
    },
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            author: {
              type: 'string',
              description: 'ID автора статті',
            },
            title: {
              type: 'string',
              description: 'Заголовок статті',
            },
            content: {
              type: 'string',
              description: 'Контент статті',
            },
            baseImage: {
              type: 'string',
              description: 'Основне зображення статті',
            },
            allImages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Інші зображення статті',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата створення статті',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата останнього оновлення статті',
            },
          }
        }
      }
    },
    servers: [
      {
        url: `${host}:${port}`,
        description: 'Base URL',
      },
    ],
  },
  apis: ['./src/routers/*.js'],
};

const specs = swaggerJsdoc(options);

export default specs;

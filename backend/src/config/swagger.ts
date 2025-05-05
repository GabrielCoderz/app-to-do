import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
 
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: `http://localhost:3333/api/v1`,
      },
    ],
  },

  apis: ['./src/routes/user.routes.ts', './src/routes/task.routes.ts'],
};
 
const swaggerDocs = swaggerJSDoc(swaggerOptions);
 
const setupSwagger = (app: Express) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
 
export default setupSwagger;
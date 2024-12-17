import http from 'http';

import logger from './utils/logger';
import {  APOLLO_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';

/* const startServer = async () => {
  const httpServer = http.createServer(app);

  const apolloServer = createApolloServer();

  await apolloServer.listen({ port: APOLLO_PORT });

  httpServer.on('request', app.callback());

  await new Promise((resolve) =>
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer(); */
const startServer = async () => {
  // Detectar el puerto del entorno o usar un valor por defecto
  const PORT = process.env.PORT || 5000;

  const httpServer = http.createServer(app);

  // Configuración del servidor Apollo
  const apolloServer = createApolloServer();
  await apolloServer.listen({ port: APOLLO_PORT }); // Apollo puede usar un puerto diferente para GraphQL

  httpServer.on('request', app.callback());

  // Escuchar en el puerto detectado por Render
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer();


//CAMBIOS PARA LOCAL

import http from 'http';

import logger from './utils/logger';
import { API_PORT, APOLLO_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';

const startServer = async () => {
  const httpServer = http.createServer(app);

  const apolloServer = createApolloServer();

  await apolloServer.listen({ port: APOLLO_PORT });

  httpServer.on('request', app.callback());

  await new Promise((resolve) =>
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer();
 
//CAMBIOS PARA RENDER
/* import http from 'http';
import logger from './utils/logger';
import { API_PORT } from './config'; // APOLLO_PORT ya no se usará aquí
import createApolloServer from './apolloServer';
import app from './app';

const startServer = async () => {
  // Render asigna un puerto a través de la variable de entorno PORT
  const PORT = process.env.PORT || API_PORT;

  // Crear el servidor HTTP
  const httpServer = http.createServer(app);

  // Configurar Apollo Server
  const apolloServer = createApolloServer();

  // Iniciar Apollo Server y aplicarlo como middleware en Koa
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Escuchar en el puerto asignado
  httpServer.listen(PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
    logger.info(
      `🚀 Apollo Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

startServer(); */

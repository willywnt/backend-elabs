const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = process.env.PORT ? process.env.PORT : 5000;
const init = async () => {
  const server = Hapi.server({
    port,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

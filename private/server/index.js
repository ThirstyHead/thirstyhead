'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const server = new Hapi.Server({
  port: 8000,
  routes:{
    files:{
      relativeTo: Path.join(__dirname, '..', '..', 'public')
    }
  }
});

const init = async () => {
  await server.register(Inert);
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  });

  return server;
};

const start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Server info: ${JSON.stringify(server.info, null, 2)}`);
  return server;
};

const provision = async () => {
  await init();
  await start();
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports.init = init;
module.exports.provision = provision;

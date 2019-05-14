'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const webdir = Path.join(__dirname, '..', '..', 'public');
const serverOptions = {
  port: 8000,
  routes:{
    files:{
      relativeTo: webdir
    }
  }
};

const server = new Hapi.Server(serverOptions);

exports.init = async () => {
  await server.register(Inert);
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: webdir,
        redirectToSlash: true
      }
    }
  });

  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`__dirname ${__dirname}`);
  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Server info: ${JSON.stringify(server.info, null, 2)}`);
  console.log(`Server routes: ${JSON.stringify(server.table(), null, 2)}`);
  console.log(`Serving files from ${webdir}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

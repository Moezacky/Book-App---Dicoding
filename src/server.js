/* eslint-disable linebreak-style */
import Hapi from '@hapi/hapi';
import route from './route.js';


const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });

  server.route(route);

  await server.start();
  console.log(`server berjalan di ${server.info.uri}`);
};

init();
const {init, provision} = require('./index.js');

const start = async () => {
//  await init();
  await provision();
};

start();

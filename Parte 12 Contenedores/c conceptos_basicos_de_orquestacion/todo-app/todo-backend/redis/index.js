/* const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    
}

module.exports = {
  getAsync,
  setAsync
} */
  /* const redis = require('redis');
  const { promisify } = require('util');
  const { REDIS_URL } = process.env;  // Usamos process.env directamente para obtener la URL de Redis
  
  let getAsync;
  let setAsync;
  
  if (!REDIS_URL) {
    const redisIsDisabled = () => {
      console.log('No REDIS_URL set, Redis is disabled');
      return null;
    };
    getAsync = redisIsDisabled;
    setAsync = redisIsDisabled;
  } else {
    const client = redis.createClient({
      url: REDIS_URL   // Usamos la URL de Redis de la variable de entorno
    });
  
    client.on('connect', () => {
      console.log('Conectado a Redis');
    });
  
    client.on('error', (err) => {
      console.error('Error de conexión con Redis:', err);
    });
  
    getAsync = promisify(client.get).bind(client);
    setAsync = promisify(client.set).bind(client);
  }
  
  module.exports = {
    getAsync,
    setAsync
  }; */
  const { createClient } = require('redis');
const { promisify } = require('util');
console.log('REDIS_URL:en redis.index.js', process.env.REDIS_URL);

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';; // Asegúrate de que REDIS_URL esté definida

let getAsync;
let setAsync;

try {
    const client = createClient({ url: REDIS_URL });

    client.on('error', (err) => {
        console.error('Error en la conexión con Redis:', err);
    });

    client.connect()
        .then(() => {
            console.log('Conectado a Redis');
        })
        .catch(err => {
            console.error('Error al conectar con Redis:', err);
        });

    getAsync = promisify(client.get).bind(client);
    setAsync = promisify(client.set).bind(client);

} catch (error) {
    console.error('Error al configurar Redis:', error);
    getAsync = setAsync = async () => null;
}

module.exports = {
    client,
    getAsync,
    setAsync,
};



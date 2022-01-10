/**
 * 连接 redis 的方法 get set
 */

// const redis = require('redis');
const { createClient } = require('redis');
const { REDIS_CONF } = require('../conf/db');

// 创建客户端
// const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

// redisClient.on('error', (err) => {
//   console.error('redis error =======================', err);
// });
// redisClient.on('connect', (err) => {
//   console.error('redis connect =======================', err);
// });

let redisClient = null;
(async () => {
  redisClient = createClient({
    socket: {
      port: REDIS_CONF.port,
      host: REDIS_CONF.host,
    },
  });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  redisClient.connect();
})();

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位 s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis get
 * @param {string} key 键
 */
async function get(key) {
  const val = await redisClient.get(key);
  if (!val) return null;
  try {
    return JSON.parse(val);
  } catch (ex) {
    return val;
  }
  // const promise = new Promise((resolve, reject) => {
  //   redisClient.get(key, (err, val) => {
  //     if (err) {
  //       reject(err);
  //       return;
  //     }
  //     if (val == null) {
  //       resolve(null);
  //       return;
  //     }

  //     try {
  //       resolve(JSON.parse(val));
  //     } catch (ex) {
  //       resolve(val);
  //     }
  //   });
  // });
  // return promise;
}

module.exports = {
  set,
  get,
};

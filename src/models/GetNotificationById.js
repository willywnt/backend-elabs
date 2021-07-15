const pool = require('../connection');

const getNotificationById = (id) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM notification WHERE user_id = '${id}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getNotificationById;

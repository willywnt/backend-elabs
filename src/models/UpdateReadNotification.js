const pool = require('../connection');

const updateReadNotification = (id) => new Promise((resolve, reject) => {
  pool.query('UPDATE `notification` SET `reading` = ? where `id` = ?', [true, id], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = updateReadNotification;

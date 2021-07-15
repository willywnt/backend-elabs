const pool = require('../connection');

const getAllGroup = () => new Promise((resolve, reject) => {
  pool.query('SELECT * FROM chat_group', [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getAllGroup;

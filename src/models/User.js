const pool = require('../connection');

const getAllUsers = () => new Promise((resolve, reject) => {
  pool.query('SELECT * FROM users', [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getAllUsers;

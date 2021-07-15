const pool = require('../connection');

const getAllComputer = (komputer, hari) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM ${komputer} WHERE hari='${hari}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getAllComputer;

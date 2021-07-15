const pool = require('../connection');

const getAllSchedule = (jadwal, hari) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM ${jadwal} WHERE hari='${hari}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getAllSchedule;

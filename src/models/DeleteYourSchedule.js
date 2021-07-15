const pool = require('../connection');

const DeleteYourScheduleById = (id) => new Promise((resolve, reject) => {
  pool.query(`DELETE FROM your_schedule WHERE id = '${id}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = DeleteYourScheduleById;

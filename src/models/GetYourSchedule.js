const pool = require('../connection');

const getYourScheduleById = (id, day) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM your_schedule WHERE user_id = '${id}' AND day = '${day}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getYourScheduleById;

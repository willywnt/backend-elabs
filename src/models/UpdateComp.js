const pool = require('../connection');

const updateCompSelected = (komputer, sesi, id) => new Promise((resolve, reject) => {
  pool.query(`UPDATE ${komputer} SET ${sesi} = '1' WHERE id = '${id}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = updateCompSelected;

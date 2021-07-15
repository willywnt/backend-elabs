const pool = require('../connection');

const getStatusById = (id) => new Promise((resolve, reject) => {
  pool.query(`SELECT * FROM daftar_pengajuan WHERE user_id = '${id}'`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = getStatusById;

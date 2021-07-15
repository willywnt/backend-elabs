const pool = require('../connection');

const addBorrow = (
  ruangan, compId, tanggal, hari, jam, sesi, keperluan, statusId, userId, createdAt, updatedAt,
) => new Promise((resolve, reject) => {
  pool.query(`INSERT INTO daftar_pengajuan (ruangan, id_komputer, tanggal, hari, jam, sesi, keperluan, status_id, user_id, created_at, updated_at) VALUES ('${ruangan}', '${compId}', '${tanggal}', '${hari}', '${jam}', '${sesi}', '${keperluan}', '${statusId}', '${userId}', '${createdAt}', '${updatedAt}')`, [], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = addBorrow;

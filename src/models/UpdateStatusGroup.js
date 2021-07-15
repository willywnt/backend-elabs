const pool = require('../connection');

const updateStatusGroup = (lastUser, lastText, today, group) => new Promise((resolve, reject) => {
  pool.query('UPDATE `chat_group` SET `last_user` = ?, `last_text` = ?, `updated_at` = ? where `group` = ?', [lastUser, lastText, today, group], (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = updateStatusGroup;

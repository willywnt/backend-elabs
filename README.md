# Back-end Elabs

ini adalah source code untuk back end server menggunakan node JS. Untuk alasan keamaanan database, silahkan configurasi database anda sendiri dengan membuat file connection.js pada folder src. berikut source code untuk contoh connection ke database(MySQL) :

```javascript
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 2,
  host: 'localhost',
  user: 'user_db',
  password: 'password_db',
  database: 'db',
});

pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports = pool;
```

setelah berhasil men-download project, silahkan jalankan npm install untuk menginstall semua packet depedencies pada project ini.

```bash
npm install
```

project ini merupakan backend web sever dari aplikasi peminjaman lab, untuk source code aplikasi dapat dilihat di https://github.com/willywnt/elabs
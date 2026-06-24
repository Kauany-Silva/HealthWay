import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'health_way'
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Banco conectado!');
});

export default db;
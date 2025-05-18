const mysql = require('mysql2');

const Connection = () => {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'st_luke',
    });

    db.connect(err => {
        if(err){
            console.log('Database is not connected', err);
            return;
        }
        console.log('Database is connected')
    });

    return db;
}

module.exports = Connection;
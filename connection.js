var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12392346',
    password: 'Y2gT6gkakl',
    database: 'sql12392346',
    charset: 'utf8_general_ci'
});


module.exports = connection;
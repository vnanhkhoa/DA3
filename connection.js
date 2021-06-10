var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'byczhqlu4jtcypircf8a-mysql.services.clever-cloud.com',
    user: 'u0nfaytxfwl02dls',
    password: 'uQM8QSztOtUS4LEkhB3X',
    database: 'byczhqlu4jtcypircf8a',
    charset: 'utf8_general_ci'
});


module.exports = connection;
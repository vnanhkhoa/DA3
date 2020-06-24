const express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connection = require('./connection.js');
var AdminRouter = require('./routers/admin.router');
var LoginRouter = require('./routers/login.router');

const app = express();
var http = require('http').createServer(app);
var io = require('./socket.io/socket.io.js')(http);

var check = (req, res, next) => {
    if (!req.signedCookies.user) {
        res.redirect('/login');
        return;
    }
    res.locals.user = req.signedCookies.user;
    next();
}

app.use(cookieParser('sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5'));

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use('/login', LoginRouter)
app.use('/admin', check, AdminRouter)

app.use(bodyParser.json());

app.use(
    session({
        secret: 'mySecretKey',
    })
);
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connect success");
});



http.listen(port, () => console.log(`App listening at http://localhost:${port}`));

app.get('/', check, (req, res) => {
    // var x = connection.query('SELECT * FROM `mon_hoc`', function (error, results, fields) {
    //     if (error) throw error;
    //     for (var i = 0; i < results.length; i++) {
    //         var row = results[i].ten_mon_hoc;
    //         console.log(row)
    //     }
    // });
    // console.log(x)

    res.render("page/home", {
        title: "Home",
        user: res.locals.user,
    });
});
// var x = new Date().toUTCString();
// console.log(x);
// setInterval(function() {
//     if (x == new Date().toUTCString()) {
//         console.log(x);
//     }
//     console.log(new Date().toUTCString());
// }, 1000);
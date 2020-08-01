const express = require('express');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connection = require('./connection.js');
var AdminRouter = require('./routers/admin.router');
var LoginRouter = require('./routers/login.router');
var HomeRouter = require('./routers/home.router');
var APiRouter = require('./routers/api.router');

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
app.use('/home', check, HomeRouter)
app.use('/api',  APiRouter)

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
    var x = new Date();
    var thu = ['T2','T3','T4','T5','T6','T7','CN'];
    var sql = "SELECT lich_hoc.*,lop_hoc_phan.ten_lop_hp,phong_hoc.ten_phong FROM `giao_vien`,`lich_hoc`,`lop_hoc_phan`,`phong_hoc` WHERE phong_hoc.ma_phong=lich_hoc.ma_phong AND lop_hoc_phan.ma_lop_hp=lich_hoc.ma_lop_hp AND giao_vien.mgv=lich_hoc.mgv AND giao_vien.email='"
    +res.locals.user+"' AND lich_hoc.thoi_gian='"+thu[x.getDay() - 1]+"'"
   connection.query(sql, function (error, results) {
        if (error) throw error;
        res.render("pageTeacher/home", {
            title: "Home",
            user: res.locals.user,
            lich_day: results,
        });
    });
});

// setInterval(function() {
//     var x = new Date();
//     console.log(x.toDateString()+" "+x.toTimeString());
//     if (x.toTimeString().split(" ")[0] == "23:14:00") {
//         console.log(x.getDay())
//     }
//     // console.log(x.getDay())
//     // console.log(new Date().toUTCString());
// }, 1000);
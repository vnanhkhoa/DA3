const express = require('express');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connection = require('./connection.js');
const AdminRouter = require('./routers/admin.router');
const LoginRouter = require('./routers/login.router');
const HomeRouter = require('./routers/home.router');
const APiRouter = require('./routers/api.router');

const app = express();
const http = require('http').createServer(app);

const check = (req, res, next) => {
    if (!req.signedCookies.user) {
        res.redirect('/login');
        return;
    }
    res.locals.user = req.signedCookies.user;
    next();
}

app.use(cookieParser('sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5'));

const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use('/assets', express.static(__dirname + '/public'));
app.use(expressLayouts);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/login', LoginRouter)
app.use('/admin', check, AdminRouter)
app.use('/home', check, HomeRouter)
app.use('/api', APiRouter)


app.use(
    session({
        secret: 'mySecretKey',
    })
);
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connect success");
});



http.listen(port, () => console.log(`App listening at http://localhost:${port}`));

app.get('/', check, (req, res) => {
    var x = new Date();
    var thu = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    var sql = "SELECT lich_hoc.*,lop_hoc_phan.ten_lop_hp,phong_hoc.ten_phong FROM `giao_vien`,`lich_hoc`,`lop_hoc_phan`,`phong_hoc` WHERE phong_hoc.ma_phong=lich_hoc.ma_phong AND lop_hoc_phan.ma_lop_hp=lich_hoc.ma_lop_hp AND giao_vien.mgv=lich_hoc.mgv AND giao_vien.email='"
        + res.locals.user + "' AND lich_hoc.thoi_gian='" + thu[x.getDay() - 1] + "'"
    connection.query(sql, function (error, results) {
        if (error) throw error;
        res.render("pageTeacher/home", {
            title: "Home",
            user: res.locals.user,
            lich_day: results,
        });
    });
});

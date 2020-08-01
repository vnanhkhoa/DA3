var connection = require('../connection.js');

module.exports = {
    edit_password : (req, res) => {
        var pass_old = req.body.pass_old;
        var pass_new = req.body.pass_new;
        var sql = "UPDATE `tai_khoan` SET `mat_khau`='"+pass_new+"' WHERE `mat_khau`='"+pass_old+"' AND ten_tai_khoan='"+req.body.user+"'";
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.redirect(req.body.path);
        })
    },

    calendar : (req, res) => {
        var sql = "SELECT lich_hoc.*,lop_hoc_phan.ten_lop_hp,phong_hoc.ten_phong FROM `giao_vien`,`lich_hoc`,`lop_hoc_phan`,`phong_hoc` WHERE phong_hoc.ma_phong=lich_hoc.ma_phong AND lop_hoc_phan.ma_lop_hp=lich_hoc.ma_lop_hp AND giao_vien.mgv=lich_hoc.mgv AND giao_vien.email='"+res.locals.user+"'"
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.render('pageTeacher/calendar',{
                title: "Lịch Dạy",
                lich_day: rows,
            })
        })
    },

    point : (req, res) => {
        var sql = "SELECT DISTINCT lop_hoc_phan.*,mon_hoc.ten_mon_hoc FROM "
        +"`mon_hoc`,`giao_vien`,`lich_hoc`,`lop_hoc_phan` WHERE "
        +"mon_hoc.ma_mon_hoc=lop_hoc_phan.ma_mon_hoc AND "
        +"lop_hoc_phan.ma_lop_hp=lich_hoc.ma_lop_hp AND "
        +"giao_vien.mgv=lich_hoc.mgv AND giao_vien.email='"+res.locals.user+"'"
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.render('pageTeacher/point',{
                title: "Nhập Điểm",
                lop_hp: rows,
            })
        })
    },

    point_edit : (req, res) => {
        var sql = "SELECT diem_hp.*,sinh_vien.ten FROM `lop_hoc_phan`,`ct_lop_hp`,`sinh_vien`,`diem_hp` "
        +"WHERE lop_hoc_phan.ma_mon_hoc=diem_hp.ma_mon_hoc AND lop_hoc_phan.ma_lop_hp=ct_lop_hp.ma_lop_hp AND"
        +" ct_lop_hp.ma_sinh_vien=diem_hp.ma_sinh_vien AND sinh_vien.msv=diem_hp.ma_sinh_vien AND lop_hoc_phan.ma_lop_hp='"+req.params.lop+"'"
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.render('pageTeacher/editPoint',{
                title: "Nhập Điểm",
                list: rows,
            })
        })
    },

    editPoint : (req, res) => {
        var sql = "UPDATE `diem_hp` SET ? WHERE `ma_diem`="+req.body.edit;
        var tb = 0.2*req.body.cc+0.3*req.body.gk+0.5*req.body.ck;
        var chu = "";
        switch (true) {
            case (tb < 4):
                chu = "F"
            break;
            case (tb >= 4) && (tb < 5.5):
                chu = "D"
            break;
            case (tb >= 5.5) && (tb < 7):
                chu = "C"
            break;
            case (tb >= 7) && (tb < 8.5):
                chu = "B"
            break;
            case (tb >= 8.5) && (tb < 10):
                chu = "A"
            break;
        }
        var diem_hp = {
            diem_cc: Number(req.body.cc),
            diem_gk: Number(req.body.gk),
            diem_ck: Number(req.body.ck),
            diem_tb: (Math.round(tb * 1000)/1000).toFixed(1),
            diem_chu: chu,
        }
        console.log(diem_hp);
        connection.query(sql,diem_hp,(err, rows) => {
            if (err) throw err;
            res.redirect(req.body.path);
        })
    },

}
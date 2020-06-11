var connection = require('../connection.js');

module.exports = {

    lop: (req, res) => {

        connection.query("SELECT * FROM `lop`", (err, rows) => {
            if (err) throw err;
            res.render('page/lop', {
                title: 'Lop',
                user: res.locals.user,
                classes: rows,
            })
        })
    },

    account: (req, res) => {

        connection.query("SELECT * FROM `tai_khoan`", (err, rows) => {
            if (err) throw err;
            res.render('page/account', {
                title: 'Account',
                user: res.locals.user,
                accounts: rows,
            })

        })
    },

    edit: (req, res) => {
        console.log(req.body);
        var sql = "UPDATE `lop` SET `ma_lop`= '" + req.body.ma_lop + "',`ten_lop`='" + req.body.tenlop + "' WHERE `id`=" + req.body.edit
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.redirect("/home/class");
        })
    },

    add_class: (req, res) => {
        var sql = "INSERT INTO `lop`(`ma_lop`, `ten_lop`) VALUES ('" + req.body.ma_lop + "','" + req.body.ten_lop + "')";
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.redirect("/home/class");
        })
    },

    delete_class: (req, res) => {
        var sql = "DELETE FROM `lop` WHERE `id`=" + req.params.id;
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.redirect("/home/class");
        })
    },

    delete: (req, res) => {
        var sql = "DELETE FROM `" + req.params.table + "` WHERE `id`=" + req.params.id;
        if (req.params.table == "sinh_vien" | req.params.table == "giao_vien") {
            sql = "DELETE `tai_khoan`,`" + req.params.table + "` FROM `tai_khoan`,`" + req.params.table + "` WHERE tai_khoan.id = " +
                req.params.table + ".ma_tai_khoan AND " + req.params.table + ".id = '" + req.params.id + "'";
        }
        console.log(sql)
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.send(true);
        })
    },

    student: (req, res) => {
        var sql = "SELECT sinh_vien.*,lop.ten_lop FROM `sinh_vien`,`lop` WHERE sinh_vien.ma_lop=lop.id";
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            connection.query("SELECT * FROM `lop`", (err, classes) => {
                if (err) throw err;
                res.render('page/student', {
                    title: 'Student',
                    user: res.locals.user,
                    students: rows,
                    classes: classes,
                })
            })
        })

    },

    update_student: (req, res) => {
        var student = {
            msv: req.body.msv,
            ten: req.body.ten,
            ngay_sinh: req.body.ngay_sinh,
            gioi_tinh: req.body.gt,
            email: req.body.email,
            sdt: req.body.sdt,
            dia_chi: req.body.dia_chi,
            ma_lop: req.body.ma_lop,
        }
        var sql = "UPDATE sinh_vien SET ? WHERE id =" + req.body.edit;
        connection.query(sql, student, (error, results, fields) => {
            if (error) throw error;
            var sql_account = "UPDATE `tai_khoan` SET `ten_tai_khoan`='" + student.email + "' WHERE `ten_tai_khoan`='" + req.body.email_old + "'";
            connection.query(sql_account, (err, rows) => {
                if (error) throw error;
                res.redirect("/home/student");
            })

        })
    },

    insert_student: (req, res) => {
        var sql_account = "INSERT INTO `tai_khoan`(`ten_tai_khoan`, `mat_khau`, `vai_tro`) VALUES ('" + req.body.email + "','123','1')";
        connection.query(sql_account, (err, rows) => {
            if (err) throw err;
            var sql = "INSERT INTO `sinh_vien`(`msv`, `ten`, `ngay_sinh`, `gioi_tinh`, `email`, `sdt`, `dia_chi`, `ma_lop`, `ma_tai_khoan`) VALUES (?,?,?,?,?,?,?,?,?)";
            var student = [
                req.body.msv,
                req.body.ten,
                req.body.ngay_sinh,
                req.body.gt,
                req.body.email,
                req.body.sdt,
                req.body.dia_chi,
                req.body.ma_lop,
                rows.insertId
            ];
            connection.query(sql, student, (err, result) => {
                if (err) throw err;
                res.redirect("/home/student");
            })
        })
    },

    teacher: (req, res) => {
        var sql = "SELECT * FROM `giao_vien`";
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            res.render('page/teacher', {
                title: 'Teacher',
                user: res.locals.user,
                teachers: rows,
            })
        })
    },

    insert_teacher: (req, res) => {
        var sql_account = "INSERT INTO `tai_khoan`(`ten_tai_khoan`, `mat_khau`, `vai_tro`) VALUES ('" + req.body.email + "','123','0')";
        connection.query(sql_account, (err, rows) => {
            if (err) throw err;
            var sql = "INSERT INTO `giao_vien`(`mgv`, `ten`, `sdt`, `email`, `ma_tai_khoan`) VALUES (?,?,?,?,?)";
            var teacher = [
                req.body.mgv,
                req.body.ten,
                req.body.sdt,
                req.body.email,
                rows.insertId
            ];
            connection.query(sql, teacher, (err, result) => {
                if (err) throw err;
                res.redirect("/home/teacher");
            })
        })
    },

    update_teacher: (req, res) => {
        var teacher = {
            mgv: req.body.mgv,
            ten: req.body.ten,
            sdt: req.body.sdt,
            email: req.body.email,
        }
        var sql = "UPDATE giao_vien SET ? WHERE id =" + req.body.edit;
        connection.query(sql, teacher, (error, results, fields) => {
            if (error) throw error;
            var sql_account = "UPDATE `tai_khoan` SET `ten_tai_khoan`='" + teacher.email + "' WHERE `ten_tai_khoan`='" + req.body.email_old + "'";
            connection.query(sql_account, (err, rows) => {
                if (error) throw error;
                res.redirect("/home/teacher");
            })

        })
    },

    subject: (req, res) => {
        var sql = "SELECT * FROM `mon_hoc`";
        connection.query(sql, (err, rows) => {
            if (err) throw err;
            console.log(rows)
            res.render('page/subject', {
                title: 'Subject',
                user: res.locals.user,
                subjects: rows,
            })
        })
    },

    update_subject: (req, res) => {
        var sql = "UPDATE mon_hoc SET ? WHERE id =" + req.body.id;
        connection.query(sql, req.body, (error, results, fields) => {
            if (error) throw error;
            res.redirect("/home/subject");
        })
    },

    insert_subject: (req, res) => {
        var sql_account = "INSERT INTO `mon_hoc`(`ma_mon_hoc`, `ten_mon_hoc`) VALUES ('" + req.body.ma_mon_hoc + "','" + req.body.ten_mon_hoc + "')";
        connection.query(sql_account, (err, rows) => {
            if (err) throw err;
            res.redirect("/home/subject");
        })
    },


}
var connection = require('../connection.js');

module.exports = {
    login: (req, res) => {
        res.render('login/index', {
            title: 'Login'
        })
    },

    login_post: async (req, res) => {
        var username = req.body.username;
        var password = req.body.password;

        if (username === "admin" && password === "123") {
            res.cookie('user', username, {
                signed: true
            });
            res.redirect('/')
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/")
    },
}
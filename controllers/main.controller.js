exports.MainController = function(app, dbcon, mongo) {
    app.get('/', (req, res) => {
        res.render('home');
    });

}
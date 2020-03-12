exports.MainController = function(app, dbcon) {
    app.get('/', (req, res) => {
        res.render('home');
    });

}
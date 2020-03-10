exports.MainController = function(app, dbcon) {
    //When the root url requested, home page will be rendered
    app.get('/', (req, res) => {
        res.render('home');
    });

}
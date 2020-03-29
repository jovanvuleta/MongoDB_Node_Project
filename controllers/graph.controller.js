exports.GraphController = function(app) {
    app.get('/graphRepresentation', (req, res) => {
        res.render('graphRepresentation');
    });
}
<<<<<<< HEAD
exports.GraphController = (app, dbcon, mongo, neo4j) => {

=======
exports.GraphController = function(app) {
>>>>>>> 895b579e2fed3942da930eb730996ff0ceb08ebe
    app.get('/graphRepresentation', (req, res) => {
        res.render('graphRepresentation');
    });
}
exports.GraphController = (app, dbcon, mongo, neo4j) => {

    app.get('/graphRepresentation', (req, res) => {
        res.render('graphRepresentation');
    });
}
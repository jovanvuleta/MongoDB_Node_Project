const { app, dbcon, mongo, neo4j } = require('./core/app.config.js').AppConfig();

require('./controllers/main.controller.js').MainController(app, dbcon, mongo, neo4j);
require('./controllers/state.controller.js').StateController(app, dbcon, mongo, neo4j);
require('./controllers/populatedPlace.controller.js').PopulatedPlaceController(app, dbcon, mongo, neo4j);
require('./controllers/institution.controller.js').InstitutionController(app, dbcon, mongo, neo4j);
require('./controllers/employees.controller.js').EmployeesController(app, dbcon, mongo, neo4j);
require('./controllers/course.controller.js').CourseController(app, dbcon, mongo, neo4j);
require('./controllers/contract_history.controller.js').ContractHistoryController(app, dbcon, mongo, neo4j);
require('./controllers/documentOfEmployement.controller').DocumentOfEmployementController(app, dbcon, mongo, neo4j);
<<<<<<< HEAD
require('./controllers/graph.controller').GraphController(app, dbcon, mongo, neo4j);
=======
require('./controllers/graph.controller.js').GraphController(app);
>>>>>>> 895b579e2fed3942da930eb730996ff0ceb08ebe

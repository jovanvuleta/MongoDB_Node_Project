const { app, dbcon, mongo } = require('./core/app.config.js').AppConfig();

require('./controllers/main.controller.js').MainController(app, dbcon);
require('./controllers/state.controller.js').StateController(app, dbcon);
require('./controllers/institution.controller.js').InstitutionController(app, dbcon);

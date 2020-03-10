const { app, dbcon, mongo } = require('./core/app.config.js').AppConfig();

require('./controllers/main.controller.js').MainController(app, dbcon, mongo);
require('./controllers/state.controller.js').StateController(app, dbcon, mongo);
require('./controllers/populatedPlace.controller.js').PopulatedPlaceController(app, dbcon, mongo);

// U KURAC
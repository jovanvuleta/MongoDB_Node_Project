exports.InstitutionController = function(app, dbcon) {
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    
    app.get('/getAllInstitutions', (req, res) => {
        institutionModel.getAllInstitutions()
        .then((data) => {
            res.render('institutions', {  //render the states.ejs view
                institutions : data,   //send the retrieved data to the view as an object called 'states'
                successMessage : ''
            });
        })
        .catch(err => {     //in case of error executing the query, render the 'states.ejs' view and display the obtained error message
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                // link : '<a href="/addInstitution"> Go Back</a>'
            });  
        });
    });

    app.get('/addInstitution', (req, res) => {

        let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();
        
        Promise.all([getAllStates, getAllTypes, getAllOwnerships])
        .then((data) => {
                res.render('addInstitution', {
                    states : data[0],
                    types : data[1],
                    ownerships : data[2]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });
    
    app.post('/addInstitution', (req, res) => {

        let getAllInstitutions = institutionModel.getAllInstitutions().then();
        let getInstitution = institutionModel.addInstitution(req.body.institutionId, req.body.institutionName, req.body.institutionType, req.body.stateId, req.body.ownershipType).then();

        Promise.all([getAllInstitutions, getInstitution])
        .then((data) => {
            res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                successMessage : 'Institution ' + req.body.institutionName + ' was added successfully.',   //success message
                link : '<a href="/getAllInstitutions"> Go Back</a>'   //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/addInstitution"> Go Back</a>'
            });
        });
    });
    
    app.get('/editInstitutionById/:id', (req, res) => {
        let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();
        let getInstitution = institutionModel.getInstitutionById(req.params.id).then();
        
        //Retrieves state's data in order to show the intinal data of the requested state to be dited
        Promise.all([getAllStates, getAllTypes, getAllOwnerships, getInstitution]).then((data) => {
            res.render('editInstitution', {
                states : data[0],
                types : data[1],
                ownerships : data[2],
                institution : data[3][0]
            });
        })
        .catch((err) => {
            res.send('editInstitution', err);
        });
    });
    
    app.post('/editInstitutionById/:id', (req, res) => {
        institutionModel.editInstitutionById(req.body.institutionType, req.body.institutionName, req.body.stateId, req.body.ownershipType, req.params.id)
        .then((data) => {
            res.render('message', {
                successMessage : 'Institution ' + req.body.institutionName + ' was edited successfully!',  //success message
                link : '<a href="/getAllInstitutions"> Go back!</a>'      //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/editInstitutionById/' + req.body.institutionId + ' "> Go back!</a>'   //This link will redirect to the edit page of the state with the ID submitted in the form
            });
        });
    });
    
    app.get('/deleteInstitutionById/:id', (req, res) => {
        institutionModel.deleteInstitutionById(req.params.id)
        .then((data) => {
            res.render('message', {
                successMessage : 'Institution ' + req.params.id + ' was deleted successfully!',  //success message
                link : '<a href="/getAllInstitutions"> Go back!</a>'      //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/getAllInstitutions"> Go Back</a>'
            });
        });
    });
}

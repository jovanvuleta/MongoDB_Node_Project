exports.InstitutionCollectionModel = function(mongo){
    
    return {

        getAllInstitutionDocuments: function(){
            return new Promise((resolve, reject) =>{
                mongo.collection('institutions').find((err, result) =>{
                    if(!err){
                        resolve(result);
                    }else{
                        reject(err);
                    }
                });
            });
        },

        insertInstitutionDocuments: function(institutionDocument){
            return new Promise((resolve, reject) =>{
                mongo.collection('institutions').insert(institutionDocument, (err, result) => {
                    if(!err){
                        resolve(result);
                    }else{
                        reject(err);
                    }
                });
            });
        }
    }

}
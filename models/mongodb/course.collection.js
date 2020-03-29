exports.CourseCollectionModel = function(mongo){
    
    return {

        getAllCourseDocuments: function(){
            return new Promise((resolve, reject) =>{
                mongo.collection('courses').find((err, result) =>{
                    if(!err){
                        resolve(result);
                    }else{
                        reject(err);
                    }
                });
            });
        },

        insertCourseDocuments: function(coursesDocument){
            return new Promise((resolve, reject) =>{
                mongo.collection('courses').insert(coursesDocument, (err, result) => {
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
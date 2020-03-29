exports.CourseModel = (neo4j) => {
    return {

        addCourse: (vu_type, vu_id, id, version, name) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(i:HIGH_EDUCATION_INSTITUTION {VU_IDENTIFIKATOR: $vu_id, TIP_UST: $vu_type}) MERGE (c:COURSE {NP_PREDMET: $id, NP_NAZIV_PREDMETA: $name, NP_VERZJA: $version}) MERGE ((i) - [bt:TEACHES] -> (c))';
                session.run(query, { vu_type: vu_type, vu_id: vu_id, id: id, name: name, version: version})
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    })
                    .then(() => {
                        session.close();
                    })
            });
        },

        editCourseById: (vu_type, vu_id, id, version, name) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(c:COURSE {NP_PREDMET : $id}) ON CREATE SET c.NP_NAZIV_PREDMETA = $name ON MATCH SET c.NP_NAZIV_PREDMETA = $name MERGE((i)-[r:TEACHES]->(c))';
                session.run(query, { vu_type: vu_type, vu_id: vu_id, id: id, name: name, version: version })
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    })
                    .then(() => {
                        session.close();
                    })
            });
        },

        deleteCourseById: (id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(c:COURSE {NP_PREDMET: $id}) DETACH DELETE c';
                session.run(query, { id: id })
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    })
                    .then(() => {
                        session.close();
                    })
            });
        }
    }
}  
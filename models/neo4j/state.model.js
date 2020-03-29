exports.StateModel = (neo4j) => {
    return {

        addState: (stateId, stateName, stateDate) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:STATE {DR_NAZIV: $name, DR_IDENTIFIKATOR: $id, DR_DATUM_OSNIVANJA: $stateDate}) RETURN s';
                session.run(query, { name: stateName, id: stateId, stateDate: stateDate })
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

        editStateById: (newId, stateName, oldId, stateDate) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:STATE {DR_IDENTIFIKATOR: $oldId}) ON CREATE SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName ON MATCH SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName';
                session.run(query, { oldId: oldId, newId: newId, stateName: stateName })
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

        deleteStateById: (id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR: $id}) DETACH DELETE s';
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
};
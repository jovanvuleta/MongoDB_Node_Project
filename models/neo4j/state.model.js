exports.StateModel = (neo4j) => {
    return {

        addState: (stateId, stateName) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:State {DR_NAZIV: $name, DR_IDENTIFIKATOR: $id})';
                session.run(query, { name: stateName, id: stateId })
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

        editStateById: (newId, stateName, oldId) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:State {DR_IDENTIFIKATOR: $oldId}) ON CREATE SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName ON MATCH SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName';
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
                let query = 'MATCH(s:State {DR_IDENTIFIKATOR: $id}) DETACH DELETE s';
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
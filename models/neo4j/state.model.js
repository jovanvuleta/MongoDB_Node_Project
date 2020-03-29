exports.StateModel = (neo4j) => {
    return {

        addState: (stateId, stateName, stateDate) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:State {name: $name, stateId: $id, stateDate: $stateDate}) RETURN s';
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
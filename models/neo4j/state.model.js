exports.StateModel = (neo4j) => {
    return {
        getAllStates: () => {

        },

        getStateById: (id) => {

        },

        addState: (stateId, stateName) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:State {name: $name, stateId: $id}) RETURN s';
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
                let query = 'MERGE(s:State {stateId: $oldId}) ON CREATE SET s.stateId = $newId, s.name = $stateName ON MATCH SET s.stateId = $newId, s.name = $stateName';
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
                let query = 'MATCH(s:State {stateId: $id}) DETACH DELETE s';
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
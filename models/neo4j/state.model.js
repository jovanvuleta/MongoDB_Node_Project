exports.StateModel = (neo4j) => {
    return {

        addState: (stateId, stateName, stateDate) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
<<<<<<< HEAD
                let query = 'MERGE(s:State {name: $name, stateId: $id, stateDate: $stateDate}) RETURN s';
                session.run(query, { name: stateName, id: stateId, stateDate: stateDate })
=======
                let query = 'MERGE(s:State {DR_NAZIV: $name, DR_IDENTIFIKATOR: $id})';
                session.run(query, { name: stateName, id: stateId })
>>>>>>> 895b579e2fed3942da930eb730996ff0ceb08ebe
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
<<<<<<< HEAD
                let query = 'MERGE(s:State {stateId: $oldId}) ON CREATE SET s.stateId = $newId, s.name = $stateName, s.stateDate = $stateDate ON MATCH SET s.stateId = $newId, s.name = $stateName, s.stateDate = $stateDate';
                session.run(query, { oldId: oldId, newId: newId, stateName: stateName, stateDate: stateDate })
=======
                let query = 'MERGE(s:State {DR_IDENTIFIKATOR: $oldId}) ON CREATE SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName ON MATCH SET s.DR_IDENTIFIKATOR = $newId, s.DR_NAZIV = $stateName';
                session.run(query, { oldId: oldId, newId: newId, stateName: stateName })
>>>>>>> 895b579e2fed3942da930eb730996ff0ceb08ebe
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
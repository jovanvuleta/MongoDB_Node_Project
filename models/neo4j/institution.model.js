exports.InstitutionModel = (neo4j) => {
    return {

        addInstitution: (stateId, id, name, type, ownership) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:State {stateId: $stateId}) MERGE (i:Institution {institutionId: $id, name: $name, institutionType: $type, ownershipType: $ownership}) MERGE ((i) - [bt:BELONGS_TO] -> (s))';
                session.run(query, { stateId: stateId, id: id, name: name, type: type, ownership: ownership})
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

        editInstitutionById: (state, id, type, name, newType, ownership) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:State {stateId : $state}) MERGE(i:Institution {institutionId : $id, institutionType : $type}) ON CREATE SET i.name = $name, i.institutionType = $newType, i.ownership = $ownership ON MATCH SET i.name = $name, i.institutionType = $newType, i.ownership = $ownership MERGE((c)-[r:BELONGS_TO]->(s))';
                session.run(query, { state: state, type: type, id: id, name: name, newType: newType, ownership: ownership })
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

        deleteInstitutionById: (id, type) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(i:Institution {institutionId: $id, institutionType: $type}) DETACH DELETE i';
                session.run(query, { id: id, type: type })
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
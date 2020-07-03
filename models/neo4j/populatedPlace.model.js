exports.PopulatedPlaceModel = (neo4j) => {
    return {

        addPopulatedPlace: (stateId, id, name, pttCode) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR: $stateId}) MERGE (c:CITY {NM_IDENTIFIKATOR: $id, NM_NAZIV: $name, NM_PTT_CODE: $pttCode}) MERGE ((c) - [r:BELONGS_TO] -> (s)) RETURN s, c, r';
                session.run(query, { stateId: stateId, id: id, name: name, pttCode: pttCode })
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
        editPopulatedPlaceById: (stateId, newId, name, pttCode, id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                // let query = 'MATCH(s:State {stateId: $stateId}) ON CREATE SET(c:City {cityId: $id, name = $name, zip = $pttCode}) ON MATCH SET cityId = $id, name = $name, zip = $pttCode MERGE ((c) - [r:BELONGS_TO] -> (s)) RETURN s, c, r';
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR : $stateId}) MERGE(c:CITY {NM_IDENTIFIKATOR : $id}) ON CREATE SET c.NM_IDENTIFIKATOR = $newId, c.NM_NAZIV = $name, c.NM_PTT_CODE = $pttCode ON MATCH SET c.NM_IDENTIFIKATOR = $newId, c.NM_NAZIV = $name, c.NM_PTT_CODE = $pttCode MERGE((c)-[r:BELONGS_TO]->(s)) RETURN s, c, r'
                session.run(query, { stateId: stateId, newId: newId, name: name, pttCode: pttCode, id: id })
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

        deletePlaceById: (stateId, id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR : $stateId}) MERGE(c:CITY {NM_IDENTIFIKATOR : $id}) DETACH DELETE c';
                session.run(query, { stateId: stateId, id: id})
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
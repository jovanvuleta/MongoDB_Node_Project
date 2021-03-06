exports.InstitutionModel = (neo4j) => {
    return {

        addInstitution: (stateId, id, name, type, ownership) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR: $stateId}) MERGE (hei:HIGH_EDUCATION_INSTITUTION {VU_IDENTIFIKATOR: $id, VU_NAZIV: $name, TIP_UST: $type, VV_OZNAKA: $ownership}) MERGE ((hei) - [bt:BELONGS_TO] -> (s))';
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
                let query = 'MATCH(s:STATE {DR_IDENTIFIKATOR : $state}) MERGE(hei:HIGH_EDUCATION_INSTITUTION {VU_IDENTIFIKATOR : $id, TIP_UST : $type}) ON CREATE SET hei.VU_NAZIV = $name, hei.TIP_UST = $newType, hei.VV_OZNAKA = $ownership ON MATCH SET hei.VU_NAZIV = $name, hei.TIP_UST = $newType, hei.VV_OZNAKA = $ownership MERGE((hei)-[bt:BELONGS_TO]->(s))';
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
                let query = 'MATCH(i:HIGH_EDUCATION_INSTITUTION {VU_IDENTIFIKATOR: $id, TIP_UST: $type}) DETACH DELETE i';
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
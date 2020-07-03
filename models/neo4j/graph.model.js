exports.GraphModel = (neo4j) => {
    return {
        getEverything: () => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                // let query = 'MERGE(e:Employee {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, ZAP_PREZIME: $emp_last_name, ZAP_SREDNJE_SLOVO: $emp_middle_letter, ZAP_IME: $emp_name})';
                let query = 'MATCH (N) RETURN N'
                session.run(query, {})
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    })
                    .then(() => {
                        session.close();
                    })

            })
        }
    }
}
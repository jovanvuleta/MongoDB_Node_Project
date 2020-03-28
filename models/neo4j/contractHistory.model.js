exports.ContractHistoryModel = (neo4j) => {
    return {
        addContract: (inst_type, vu_id, emp_id, cnt_type, cnt_year, cnt_id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(e:Employee {ZAP_REDNI_BROJ: $emp_id}) MATCH(dop:DOCCUMENTS_OF_EMPLOYMENT {UG_BROJ_UGOVORA: $cnt_id}) MERGE(ch:CONTRACT_HISTORY {TIP_UST: $inst_type, EMP_VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, VD_OZNAKA: $cnt_type, UG_GODINA: $cnt_year, UG_BROJ_UGOVORA: $cnt_id}) MERGE ((e) - [ce:CONTAINS_EMPLOYEE] -> (ch)) MERGE ((dop) - [cd:CONTAINS_DOCUMENT] -> (ch)) MERGE ((ch) - [ac:ABOUT_CONTRACT] -> (e)) MERGE ((ch) - [dd:DETAILED_DOCUMENT] -> (dop)) ';
                session.run(query, { inst_type: inst_type, vu_id: vu_id, emp_id: emp_id, cnt_type: cnt_type, cnt_year: cnt_year, cnt_id: cnt_id })
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
        },

        deleteContractById: (id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(ch:CONTRACT_HISTORY {UG_BROJ_UGOVORA: $id}) DETACH DELETE ch';
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
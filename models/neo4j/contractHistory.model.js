exports.contractHistoryModel = (neo4j) => {
    return {
        addContract: (inst_type, vu_id, emp_id, cnt_type, cnt_year, cnt_id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(e:Employee {ZAP_REDNI_BROJ: $emp_id}) MATCH(dop:DOCCUMENTS_OF_EMPLOYMENT {UG_BROJ_UGOVORA: $cnt_id}) MERGE(ch:CONTRACT_HISTORY {TIP_UST: $inst_type, EMP_VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, VD_OZNAKA: $cnt_type, UG_GODINA: $cnt_year, UG_BROJ_UGOVORA: $cnt_id}) MERGE ((e) - [wi:WORKS_IN] -> (hei)) MERGE ((hei) - [ed:EMPLOYEED] -> (e)) ';
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

        editContractById: (inst_type, vu_id, emp_id, emp_last_name, emp_middle_letter, emp_name) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(s:Employee {ZAP_REDNI_BROJ: $emp_id}) ON CREATE SET s.TIP_UST = $inst_type, s.VU_IDENTIFIKATOR = $vu_id, s.ZAP_REDNI_BROJ = $emp_id, s.ZAP_PREZIME = $emp_last_name, s.ZAP_SREDNJE_SLOVO = $emp_middle_letter, s.ZAP_IME = $emp_name ON MATCH SET s.TIP_UST = $inst_type, s.VU_IDENTIFIKATOR = $vu_id, s.ZAP_REDNI_BROJ = $emp_id, s.ZAP_PREZIME = $emp_last_name, s.ZAP_SREDNJE_SLOVO = $emp_middle_letter, s.ZAP_IME = $emp_name';
                session.run(query, { inst_type: inst_type, vu_id: vu_id, emp_id: emp_id, emp_last_name: emp_last_name, emp_middle_letter: emp_middle_letter, emp_name: emp_name })
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

        deleteContractById: (id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(e:Employee {ZAP_REDNI_BROJ: $id}) DETACH DELETE e';
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
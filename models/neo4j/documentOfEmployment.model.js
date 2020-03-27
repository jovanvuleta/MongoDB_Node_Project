exports.DocumentOfEmployementModel = (neo4j) => {
    return {
        addDocument: (inst_type, vu_id, cnt_type, cnt_year, cnt_id, cnt_start_date, cnt_end_date) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                // let query = 'MERGE(e:Employee {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, ZAP_PREZIME: $emp_last_name, ZAP_SREDNJE_SLOVO: $emp_middle_letter, ZAP_IME: $emp_name})';
                let query = 'MERGE(dop:DOCCUMENTS_OF_EMPLOYMENT {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id, VD_OZNAKA: $cnt_type, UG_GODINA: $cnt_year, UG_BROJ_UGOVORA: $cnt_id, UG_DATUM: $cnt_start_date, UG_DATUM_VAZENJA: $cnt_end_date}) MERGE ((e) - [wi:WORKS_IN] -> (hei))';
                session.run(query, { inst_type: inst_type, vu_id: vu_id, cnt_type: cnt_type, cnt_year: cnt_year, cnt_id: cnt_id, cnt_start_date: cnt_start_date, cnt_end_date: cnt_end_date })
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

        editDocumentById: (inst_type, vu_id, cnt_type, cnt_year, cnt_id, cnt_start_date, cnt_end_date) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MERGE(dop:DOCCUMENTS_OF_EMPLOYMENT {UG_BROJ_UGOVORA: $cnt_id) ON CREATE SET s.TIP_UST = $inst_type, s.VU_IDENTIFIKATOR = $vu_id, s.VD_OZNAKA = $cnt_type, s.UG_GODINA = $cnt_year, s.UG_BROJ_UGOVORA = $cnt_id, s.UG_DATUM = $cnt_start_date, s.UG_DATUM_VAZENJA = $cnt_end_date ON MATCH SET s.TIP_UST = $inst_type, s.VU_IDENTIFIKATOR = $vu_id, s.VD_OZNAKA = $cnt_type, s.UG_GODINA = $cnt_year, s.UG_BROJ_UGOVORA = $cnt_id, s.UG_DATUM = $cnt_start_date, s.UG_DATUM_VAZENJA = $cnt_end_date';
                session.run(query, { inst_type: inst_type, vu_id: vu_id, cnt_type: cnt_type, cnt_year: cnt_year, cnt_id: cnt_id, cnt_start_date: cnt_start_date, cnt_end_date: cnt_end_date })
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

        deleteDocumentById: (id) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                let query = 'MATCH(dop:DOCCUMENTS_OF_EMPLOYMENT {UG_BROJ_UGOVORA: $id}) DETACH DELETE dop';
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
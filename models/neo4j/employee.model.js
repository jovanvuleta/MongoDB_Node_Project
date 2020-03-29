exports.EmployeesModel = (neo4j) => {
    return {
        addEmployee: (inst_type, vu_id, emp_id, emp_last_name, emp_middle_letter, emp_name) => {
            return new Promise((resolve, reject) => {
                const session = neo4j.session();
                // let query = 'MERGE(e:Employee {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, ZAP_PREZIME: $emp_last_name, ZAP_SREDNJE_SLOVO: $emp_middle_letter, ZAP_IME: $emp_name})';
                let query = 'MATCH (hei:HIGH_EDUCATION_INSTITUTION {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id}) MERGE(e:Employee {TIP_UST: $inst_type, VU_IDENTIFIKATOR: $vu_id, ZAP_REDNI_BROJ: $emp_id, ZAP_PREZIME: $emp_last_name, ZAP_SREDNJE_SLOVO: $emp_middle_letter, ZAP_IME: $emp_name}) MERGE ((e) - [wi:WORKS_IN] -> (hei)) MERGE ((hei) - [ed:EMPLOYEED] -> (e)) ';
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
            })
        },

        editEmployeeId: (inst_type, vu_id, emp_id, emp_last_name, emp_middle_letter, emp_name) => {
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

        deleteEmployeeById: (id) => {
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
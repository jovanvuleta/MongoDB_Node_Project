/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2/13/2020 11:21:58 AM                        */
/*==============================================================*/


drop table if exists ACT_OF_ORGANIZATION;

drop table if exists ADITIONAL_DATA;

drop table if exists COMPETENCE;

drop table if exists COMPETENCE_CATEGORY;

drop table if exists COMPOSED_OF_UNITS;

drop table if exists COMPOSITE_STATE;

drop table if exists CONTACTS;

drop table if exists CONTACT_TYPE;

drop table if exists CONTRACT_HISTORY;

drop table if exists COURSE;

drop table if exists COURSES_IN_BLOCK;

drop table if exists COVERED_COMPETENCIES;

drop table if exists COVERED_EDUCATION_SUBGROUPS;

drop table if exists COVERES_COMPETENCES;

drop table if exists CURRICULUM_DEGREE;

drop table if exists CURRICULUM_LEVEL;

drop table if exists CURRICULUM_STRUCTURE;

drop table if exists CURRICULUM_TYPE;

drop table if exists DOCCUMENTS_OF_EMPLOYMENT;

drop table if exists DOCUMENT_INSTANCE;

drop table if exists DOCUMENT_PART;

drop table if exists DOCUMENT_TYPE;

drop table if exists EDUCATION_FIELDS;

drop table if exists EDUCATION_GROUPS;

drop table if exists EDUCATION_PLAN;

drop table if exists EDUCATION_SUBGROUPS;

drop table if exists ELECTIVE_COURSEC;

drop table if exists EMPLOYEES;

drop table if exists EMPLOYEE_ENGAGEMEENT;

drop table if exists ENGAGEMENT_CATEGORY;

drop table if exists FOUND_FOR_TYPE;

drop table if exists HIGH_EDUCATION_INSTITUTION;

drop table if exists HISTORY_DATA;

drop table if exists INSTITUTION_STRUCTURE;

drop table if exists INTERNAL_STRUCTURE;

drop table if exists LANGUAGES;

drop table if exists LECTURING_TYPE;

drop table if exists MANAGEMENT_POSITIONS;

drop table if exists MANAGEMENT_SCHEMA;

drop table if exists MANAGEMENT_STRUCTURE;

drop table if exists OFFICTIAL_LANGUAGES;

drop table if exists ORGANIZATIONAL_UNIT;

drop table if exists OTHER_INSTITUTIONS;

drop table if exists OWNERSHIP_TYPE;

drop table if exists POPULATED_PLACES;

drop table if exists PROFESSIONS;

drop table if exists REGISTERED_CURRICULUMS;

drop table if exists RELATION_TYPE;

drop table if exists RELATIVES;

drop table if exists RESPONSIBLE_MANAGER;

drop table if exists ROLE;

drop table if exists `SCHEMA`;

drop table if exists STATE;

drop table if exists STRUCTURED_CATEGORIES;

drop table if exists STRUCTURED_COMPETENCE;

drop table if exists TYPES_OF_INSTITUTIONS;

drop table if exists TYPE_OF_BLOCK;

drop table if exists WORK_POSSITIONS;

/*==============================================================*/
/* Table: ACT_OF_ORGANIZATION                                   */
/*==============================================================*/
create table ACT_OF_ORGANIZATION
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   AO_REDNI_BROJ        numeric(4,0) not null,
   AO_DATUM_DOKUMENTA   date not null,
   AO_VAZI_DO           date,
   OJ_IDENTIFIKATOR     int not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, AO_REDNI_BROJ)
);

/*==============================================================*/
/* Table: ADITIONAL_DATA                                        */
/*==============================================================*/
create table ADITIONAL_DATA
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   RCP_REDNI_BROJ       numeric(2,0) not null,
   ULO_OZNAKA           char(2) not null,
   PL_OZNAKA            int not null,
   DOD_IDENT            smallint not null,
   DOD_OPIS             varchar(520),
   primary key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, ULO_OZNAKA, PL_OZNAKA, RCP_REDNI_BROJ, DOD_IDENT)
);

/*==============================================================*/
/* Table: COMPETENCE                                            */
/*==============================================================*/
create table COMPETENCE
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KO_KOMPETENCIJA      char(2) not null,
   KO_NAZIV             varchar(120) not null,
   KO_OPIS              varchar(512),
   primary key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA)
);

/*==============================================================*/
/* Table: COMPETENCE_CATEGORY                                   */
/*==============================================================*/
create table COMPETENCE_CATEGORY
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KOMP_NAZIV           varchar(120) not null,
   KOMP_OPIS            varchar(512),
   primary key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA)
);

/*==============================================================*/
/* Table: COMPOSED_OF_UNITS                                     */
/*==============================================================*/
create table COMPOSED_OF_UNITS
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   OJ_IDENTIFIKATOR     int not null,
   ORG_OJ_IDENTIFIKATOR int not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR, ORG_OJ_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: COMPOSITE_STATE                                       */
/*==============================================================*/
create table COMPOSITE_STATE
(
   DR_IDENTIFIKATOR     char(3) not null,
   STA_DR_IDENTIFIKATOR char(3) not null,
   primary key (DR_IDENTIFIKATOR, STA_DR_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: CONTACTS                                              */
/*==============================================================*/
create table CONTACTS
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   TKO_OZNAKA           char(1) not null,
   KP_REDNI_BROJ        numeric(2,0) not null,
   DR_IDENTIFIKATOR     char(3),
   NM_IDENTIFIKATOR     bigint,
   KP_ADRESA            varchar(80),
   KP_E_POSTA           varchar(60),
   KP_WWW               varchar(60),
   KP_KONTAKT_TELEFON   varchar(20),
   primary key (TIP_UST, VU_IDENTIFIKATOR, TKO_OZNAKA, ZAP_REDNI_BROJ, KP_REDNI_BROJ)
);

/*==============================================================*/
/* Table: CONTACT_TYPE                                          */
/*==============================================================*/
create table CONTACT_TYPE
(
   TKO_OZNAKA           char(1) not null,
   TKO_NAZIV            varchar(30) not null,
   primary key (TKO_OZNAKA)
);

/*==============================================================*/
/* Table: CONTRACT_HISTORY                                      */
/*==============================================================*/
create table CONTRACT_HISTORY
(
   TIP_UST              char(2) not null,
   EMP_VU_IDENTIFIKATOR int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   VD_OZNAKA            char(2) not null,
   UG_GODINA            numeric(4,0) not null,
   UG_BROJ_UGOVORA      int not null,
   primary key (TIP_UST, EMP_VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA, ZAP_REDNI_BROJ)
);

/*==============================================================*/
/* Table: COURSE                                                */
/*==============================================================*/
create table COURSE
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   NP_NAZIV_PREDMETA    varchar(120) not null,
   NP_IZBORNA           bool not null default 0,
   primary key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA)
);

/*==============================================================*/
/* Table: COURSES_IN_BLOCK                                      */
/*==============================================================*/
create table COURSES_IN_BLOCK
(
   TIP_UST              char(2) not null,
   CUR_VU_IDENTIFIKATOR int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   ON_OZNAKA            char(1) not null,
   BLOKN_REDNI_BROJ     numeric(2,0) not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   primary key (TIP_UST, CUR_VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA, ON_OZNAKA, BLOKN_REDNI_BROJ, NP_PREDMET, NP_VERZIJA)
);

/*==============================================================*/
/* Table: COVERED_COMPETENCIES                                  */
/*==============================================================*/
create table COVERED_COMPETENCIES
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KO_KOMPETENCIJA      char(2) not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA, KO_KOMPETENCIJA)
);

/*==============================================================*/
/* Table: COVERED_EDUCATION_SUBGROUPS                           */
/*==============================================================*/
create table COVERED_EDUCATION_SUBGROUPS
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, PO_POLJE, GRU_GRUPA, OBL_OBLAST, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
);

/*==============================================================*/
/* Table: COVERES_COMPETENCES                                   */
/*==============================================================*/
create table COVERES_COMPETENCES
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   VID_VID              char(1) not null,
   EPL_WEEK             numeric(2,0) not null,
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KO_KOMPETENCIJA      char(2) not null,
   primary key (TIP_UST, PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, VU_IDENTIFIKATOR, KO_KOMPETENCIJA, NP_PREDMET, NP_VERZIJA, VID_VID, EPL_WEEK)
);

/*==============================================================*/
/* Table: CURRICULUM_DEGREE                                     */
/*==============================================================*/
create table CURRICULUM_DEGREE
(
   STS_OZNAKA           char(2) not null,
   STS_NAZIV            varchar(40) not null,
   primary key (STS_OZNAKA)
);

/*==============================================================*/
/* Table: CURRICULUM_LEVEL                                      */
/*==============================================================*/
create table CURRICULUM_LEVEL
(
   STS_OZNAKA           char(2) not null,
   NS_NIVO              numeric(1,0) not null,
   NA_NAZIV             varchar(60) not null,
   SN_OZNAKA            char(2),
   primary key (STS_OZNAKA, NS_NIVO)
);

/*==============================================================*/
/* Table: CURRICULUM_STRUCTURE                                  */
/*==============================================================*/
create table CURRICULUM_STRUCTURE
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   ON_OZNAKA            char(1) not null,
   BLOKN_REDNI_BROJ     numeric(2,0) not null,
   BLOKN_TRAJE          numeric(2,0) not null default 1,
   primary key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA, ON_OZNAKA, BLOKN_REDNI_BROJ)
);

/*==============================================================*/
/* Table: CURRICULUM_TYPE                                       */
/*==============================================================*/
create table CURRICULUM_TYPE
(
   TIPP_TIP             char(1) not null,
   TIPP_NAZIV           varchar(40) not null,
   primary key (TIPP_TIP)
);

/*==============================================================*/
/* Table: DOCCUMENTS_OF_EMPLOYMENT                              */
/*==============================================================*/
create table DOCCUMENTS_OF_EMPLOYMENT
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   VD_OZNAKA            char(2) not null,
   UG_GODINA            numeric(4,0) not null,
   UG_BROJ_UGOVORA      int not null,
   UG_DATIM             date not null,
   UG_DATUM_VAZENJA     date,
   primary key (TIP_UST, VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA)
);

/*==============================================================*/
/* Table: DOCUMENT_INSTANCE                                     */
/*==============================================================*/
create table DOCUMENT_INSTANCE
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   DOC_ID               numeric(3,0) not null,
   DIN_SEGMENT_ID       numeric(2,0) not null,
   DIN_DESCRIPTION      varchar(7000),
   primary key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, DOC_ID, SP_EVIDENCIONI_BROJ, SP_VERZIJA, DIN_SEGMENT_ID)
);

/*==============================================================*/
/* Table: DOCUMENT_PART                                         */
/*==============================================================*/
create table DOCUMENT_PART
(
   DOC_ID               numeric(3,0) not null,
   DOC_PARTH_NAME       varchar(240) not null,
   DOC_META_DESCRIPTION varchar(1024),
   primary key (DOC_ID)
);

/*==============================================================*/
/* Table: DOCUMENT_TYPE                                         */
/*==============================================================*/
create table DOCUMENT_TYPE
(
   VD_OZNAKA            char(2) not null,
   VD_NAZIV             varchar(40) not null,
   primary key (VD_OZNAKA)
);

/*==============================================================*/
/* Table: EDUCATION_FIELDS                                      */
/*==============================================================*/
create table EDUCATION_FIELDS
(
   PO_POLJE             char(2) not null,
   PO_NAZIV             varchar(120) not null,
   primary key (PO_POLJE)
);

/*==============================================================*/
/* Table: EDUCATION_GROUPS                                      */
/*==============================================================*/
create table EDUCATION_GROUPS
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   GRU_NAZIV            varchar(120) not null,
   primary key (PO_POLJE, GRU_GRUPA)
);

/*==============================================================*/
/* Table: EDUCATION_PLAN                                        */
/*==============================================================*/
create table EDUCATION_PLAN
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   VID_VID              char(1) not null,
   EPL_WEEK             numeric(2,0) not null,
   EPL_FOUND            numeric(2,0) not null default 2,
   EPL_DESCRIPTION      varchar(512),
   primary key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, VID_VID, EPL_WEEK)
);

/*==============================================================*/
/* Table: EDUCATION_SUBGROUPS                                   */
/*==============================================================*/
create table EDUCATION_SUBGROUPS
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   OBL_NAZIV            varchar(120) not null,
   OBL_KORPUS           bool not null default 0,
   primary key (PO_POLJE, GRU_GRUPA, OBL_OBLAST)
);

/*==============================================================*/
/* Table: ELECTIVE_COURSEC                                      */
/*==============================================================*/
create table ELECTIVE_COURSEC
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   ELL_POSSITION        numeric(2,0) not null,
   COU_NP_PREDMET       varchar(6) not null,
   COU_NP_VERZIJA       numeric(2,0) not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, ELL_POSSITION)
);

/*==============================================================*/
/* Table: EMPLOYEES                                             */
/*==============================================================*/
create table EMPLOYEES
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   ZAP_PREZIME          varchar(20) not null,
   ZAP_SREDNJE_SLOVO    char(2) not null,
   ZAP_IME              varchar(20) not null,
   ZAP_FOTOGRAFIJA      longblob,
   ZAP_JMBG             char(13),
   RCP_REDNI_BROJ       numeric(2,0),
   primary key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
);

/*==============================================================*/
/* Table: EMPLOYEE_ENGAGEMEENT                                  */
/*==============================================================*/
create table EMPLOYEE_ENGAGEMEENT
(
   EMP_TIP_UST          char(2) not null,
   EMP_VU_IDENTIFIKATOR int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   RAS_RBR              numeric(4,0) not null,
   OJ_IDENTIFIKATOR     int not null,
   VRO_OZNAKA           char(2),
   RM_OZNAKA            char(3) not null,
   RAS_ODKADA           date not null,
   RAS_DO_KADA          date,
   primary key (EMP_TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RAS_RBR)
);

/*==============================================================*/
/* Table: ENGAGEMENT_CATEGORY                                   */
/*==============================================================*/
create table ENGAGEMENT_CATEGORY
(
   VRO_OZNAKA           char(2) not null,
   VRO_NAZIV            varchar(40) not null,
   primary key (VRO_OZNAKA)
);

/*==============================================================*/
/* Table: FOUND_FOR_TYPE                                        */
/*==============================================================*/
create table FOUND_FOR_TYPE
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   NP_PREDMET           varchar(6) not null,
   NP_VERZIJA           numeric(2,0) not null,
   VID_VID              char(1) not null,
   FOND_UKUPNO_CASOVA   decimal(5,2) not null default 30,
   FOND_NACIN_IZVO_ENJA char(1) not null default 'C',
   primary key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, VID_VID)
);

/*==============================================================*/
/* Table: HIGH_EDUCATION_INSTITUTION                            */
/*==============================================================*/
create table HIGH_EDUCATION_INSTITUTION
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   VU_NAZIV             varchar(120),
   NM_IDENTIFIKATOR     bigint,
   VU_ADRESA            varchar(60),
   VU_OSNOVANA          date,
   VU_GRB               longblob,
   VU_MEMORANDUM        longblob,
   VU_WEB_ADRESA        varchar(80),
   VU_E_MAIL            varchar(60),
   VU_PIB               char(10),
   VU_MATICNI_BROJ      char(11),
   DR_IDENTIFIKATOR     char(3) not null,
   VV_OZNAKA            char(2) not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: HISTORY_DATA                                          */
/*==============================================================*/
create table HISTORY_DATA
(
   TIP_UST              char(2) not null,
   EMP_VU_IDENTIFIKATOR int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   PL_OZNAKA            int not null,
   IST_IDENT            smallint not null,
   VRO_OZNAKA           char(2) not null,
   RM_OZNAKA            char(3),
   IST_OD               date not null,
   IST_DO               date not null,
   IST_STAZ_GODINA      numeric(2,0) not null default 0,
   IST_STAZ_MESECI      numeric(2,0) not null default 0,
   IST_STAZ_DANA        numeric(2,0) not null default 0,
   primary key (TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, PL_OZNAKA, IST_IDENT)
);

/*==============================================================*/
/* Table: INSTITUTION_STRUCTURE                                 */
/*==============================================================*/
create table INSTITUTION_STRUCTURE
(
   TIP_UST              char(2) not null,
   ACT_VU_IDENTIFIKATOR int not null,
   AO_REDNI_BROJ        numeric(4,0) not null,
   EMBEDED_INSTITUTION_TYPE char(2) not null,
   EMBEDDED_INSTITUTION_ID int not null,
   primary key (TIP_UST, ACT_VU_IDENTIFIKATOR, AO_REDNI_BROJ, EMBEDED_INSTITUTION_TYPE, EMBEDDED_INSTITUTION_ID)
);

/*==============================================================*/
/* Table: INTERNAL_STRUCTURE                                    */
/*==============================================================*/
create table INTERNAL_STRUCTURE
(
   DOC_DOC_ID           numeric(3,0) not null,
   DOC_ID               numeric(3,0) not null,
   primary key (DOC_ID, DOC_DOC_ID)
);

/*==============================================================*/
/* Table: LANGUAGES                                             */
/*==============================================================*/
create table LANGUAGES
(
   JEZ_JEZIK            char(3) not null,
   JEZ_NAZIV            varchar(40) not null,
   primary key (JEZ_JEZIK)
);

/*==============================================================*/
/* Table: LECTURING_TYPE                                        */
/*==============================================================*/
create table LECTURING_TYPE
(
   VID_VID              char(1) not null,
   VID_NAZIV            varchar(40) not null,
   primary key (VID_VID)
);

/*==============================================================*/
/* Table: MANAGEMENT_POSITIONS                                  */
/*==============================================================*/
create table MANAGEMENT_POSITIONS
(
   POZ_OZNAKA           char(2) not null,
   POZ_NAZIV            varchar(60) not null,
   primary key (POZ_OZNAKA)
);

/*==============================================================*/
/* Table: MANAGEMENT_SCHEMA                                     */
/*==============================================================*/
create table MANAGEMENT_SCHEMA
(
   HIG_TIP_UST          char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   RS_IDENTIFIKATOR     smallint not null,
   POZ_OZNAKA           char(2) not null,
   primary key (HIG_TIP_UST, VU_IDENTIFIKATOR, POZ_OZNAKA, RS_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: MANAGEMENT_STRUCTURE                                  */
/*==============================================================*/
create table MANAGEMENT_STRUCTURE
(
   HIG_TIP_UST          char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   RS_IDENTIFIKATOR     smallint not null,
   OJ_IDENTIFIKATOR     int not null,
   RS_DATUM_FORMIRANJA  date not null,
   primary key (HIG_TIP_UST, VU_IDENTIFIKATOR, RS_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: OFFICTIAL_LANGUAGES                                   */
/*==============================================================*/
create table OFFICTIAL_LANGUAGES
(
   JEZ_JEZIK            char(3) not null,
   DR_IDENTIFIKATOR     char(3) not null,
   primary key (JEZ_JEZIK, DR_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: ORGANIZATIONAL_UNIT                                   */
/*==============================================================*/
create table ORGANIZATIONAL_UNIT
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   OJ_IDENTIFIKATOR     int not null,
   OJ_NAZIV             varchar(80) not null,
   DR_IDENTIFIKATOR     char(3) not null,
   NM_IDENTIFIKATOR     bigint not null,
   OJ_ADRESA            varchar(80),
   primary key (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: OTHER_INSTITUTIONS                                    */
/*==============================================================*/
create table OTHER_INSTITUTIONS
(
   PL_OZNAKA            int not null,
   DR_IDENTIFIKATOR     char(3),
   PL_NAZIV             varchar(120) not null,
   NM_IDENTIFIKATOR     bigint,
   primary key (PL_OZNAKA)
);

/*==============================================================*/
/* Table: OWNERSHIP_TYPE                                        */
/*==============================================================*/
create table OWNERSHIP_TYPE
(
   VV_OZNAKA            char(2) not null,
   VV_NAZIV             varchar(40) not null,
   primary key (VV_OZNAKA)
);

/*==============================================================*/
/* Table: POPULATED_PLACES                                      */
/*==============================================================*/
create table POPULATED_PLACES
(
   DR_IDENTIFIKATOR     char(3) not null,
   NM_IDENTIFIKATOR     bigint not null,
   NM_NAZIV             varchar(40) not null,
   NM_PTT_CODE          longtext,
   primary key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: PROFESSIONS                                           */
/*==============================================================*/
create table PROFESSIONS
(
   SN_OZNAKA            char(2) not null,
   SN_STRUCNI_NAZIV     varchar(120) not null,
   SN_SKRACENI_NAZIV    varchar(12) not null,
   primary key (SN_OZNAKA)
);

/*==============================================================*/
/* Table: REGISTERED_CURRICULUMS                                */
/*==============================================================*/
create table REGISTERED_CURRICULUMS
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   TIPP_TIP             char(1) not null,
   SP_EVIDENCIONI_BROJ  int not null,
   SP_VERZIJA           numeric(2,0) not null,
   SP_NAZIV             varchar(60) not null,
   SP_DATUM_FORMIRANJA  date not null,
   SP_DATUM_UKIDANJA    date,
   SP_ECTS              numeric(3,0) not null default 60,
   JEZ_JEZIK            char(3) not null,
   STS_OZNAKA           char(2) not null,
   NS_NIVO              numeric(1,0) not null,
   SN_OZNAKA            char(2) not null,
   primary key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
);

/*==============================================================*/
/* Table: RELATION_TYPE                                         */
/*==============================================================*/
create table RELATION_TYPE
(
   VSR_OZNAKA           char(2) not null,
   VSR_NAZIV            varchar(30) not null,
   primary key (VSR_OZNAKA)
);

/*==============================================================*/
/* Table: RELATIVES                                             */
/*==============================================================*/
create table RELATIVES
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   RCP_REDNI_BROJ       numeric(2,0) not null,
   VSR_OZNAKA           char(2),
   RCP_PREZIME          varchar(20),
   RCP_IME              varchar(20),
   RCP_JMBG             char(13),
   primary key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RCP_REDNI_BROJ)
);

/*==============================================================*/
/* Table: RESPONSIBLE_MANAGER                                   */
/*==============================================================*/
create table RESPONSIBLE_MANAGER
(
   DOC_TIP_UST          char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   VD_OZNAKA            char(2) not null,
   UG_GODINA            numeric(4,0) not null,
   UG_BROJ_UGOVORA      int not null,
   ZAP_REDNI_BROJ       numeric(6,0) not null,
   primary key (DOC_TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA)
);

/*==============================================================*/
/* Table: ROLE                                                  */
/*==============================================================*/
create table ROLE
(
   ULO_OZNAKA           char(2) not null,
   ULO_NAZIV            varchar(40) not null,
   primary key (ULO_OZNAKA)
);

/*==============================================================*/
/* Table: `SCHEMA`                                              */
/*==============================================================*/
create table `SCHEMA`
(
   TIP_UST              char(2) not null,
   ACT_VU_IDENTIFIKATOR int not null,
   AO_REDNI_BROJ        numeric(4,0) not null,
   OJ_IDENTIFIKATOR     int not null,
   primary key (TIP_UST, ACT_VU_IDENTIFIKATOR, AO_REDNI_BROJ, OJ_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: STATE                                                 */
/*==============================================================*/
create table STATE
(
   DR_IDENTIFIKATOR     char(3) not null,
   DR_NAZIV             varchar(80) not null,
   DR_DATUM_OSNIVANJA   date not null,
   DR_POSTOJALA_DO      date,
   DR_GRB               longblob,
   DR_ZASTAVA           longblob,
   DR_HIMNA             longblob,
   STA_DR_IDENTIFIKATOR char(3),
   NM_IDENTIFIKATOR     bigint,
   primary key (DR_IDENTIFIKATOR)
);

/*==============================================================*/
/* Table: STRUCTURED_CATEGORIES                                 */
/*==============================================================*/
create table STRUCTURED_CATEGORIES
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KAT_KOMP_KATEGORIJA  char(2) not null,
   COM_PO_POLJE         char(2),
   COM_GRU_GRUPA        char(2),
   COM_OBL_OBLAST       char(2),
   COM_KOMP_KATEGORIJA  char(2),
   primary key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KAT_KOMP_KATEGORIJA)
);

/*==============================================================*/
/* Table: STRUCTURED_COMPETENCE                                 */
/*==============================================================*/
create table STRUCTURED_COMPETENCE
(
   PO_POLJE             char(2) not null,
   GRU_GRUPA            char(2) not null,
   OBL_OBLAST           char(2) not null,
   KOMP_KATEGORIJA      char(2) not null,
   KO_KOMPETENCIJA      char(2) not null,
   COM_KO_KOMPETENCIJA  char(2) not null,
   primary key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA, COM_KO_KOMPETENCIJA)
);

/*==============================================================*/
/* Table: TYPES_OF_INSTITUTIONS                                 */
/*==============================================================*/
create table TYPES_OF_INSTITUTIONS
(
   TIP_UST              char(2) not null,
   TIP_NAZIV            varchar(40) not null,
   primary key (TIP_UST)
);

/*==============================================================*/
/* Table: TYPE_OF_BLOCK                                         */
/*==============================================================*/
create table TYPE_OF_BLOCK
(
   ON_OZNAKA            char(1) not null,
   ON_NAZIV             varchar(20) not null,
   primary key (ON_OZNAKA)
);

/*==============================================================*/
/* Table: WORK_POSSITIONS                                       */
/*==============================================================*/
create table WORK_POSSITIONS
(
   TIP_UST              char(2) not null,
   VU_IDENTIFIKATOR     int not null,
   RM_OZNAKA            char(3) not null,
   RM_NAZIV             varchar(50) not null,
   RM_OPERATIVNO        bool,
   primary key (TIP_UST, VU_IDENTIFIKATOR, RM_OZNAKA)
);

alter table ACT_OF_ORGANIZATION add constraint FK_APPROVED_BY foreign key (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table ACT_OF_ORGANIZATION add constraint FK_DOCUMENT foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table ADITIONAL_DATA add constraint FK_ENROLED foreign key (ULO_OZNAKA)
      references ROLE (ULO_OZNAKA) on delete restrict on update restrict;

alter table ADITIONAL_DATA add constraint FK_PREMA_PRAVNOM_LICU foreign key (PL_OZNAKA)
      references OTHER_INSTITUTIONS (PL_OZNAKA) on delete restrict on update restrict;

alter table ADITIONAL_DATA add constraint FK_RELATIV_ROLE foreign key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RCP_REDNI_BROJ)
      references RELATIVES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RCP_REDNI_BROJ) on delete restrict on update restrict;

alter table COMPETENCE add constraint FK_COMPETEN_COMPETENC_COMPETE2 foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA)
      references COMPETENCE_CATEGORY (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA) on delete restrict on update restrict;

alter table COMPETENCE_CATEGORY add constraint FK_CATEGORISED_COMPETENCIES foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST)
      references EDUCATION_SUBGROUPS (PO_POLJE, GRU_GRUPA, OBL_OBLAST) on delete restrict on update restrict;

alter table COMPOSED_OF_UNITS add constraint FK_COMPOSED_OF_UNITS foreign key (TIP_UST, VU_IDENTIFIKATOR, ORG_OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table COMPOSED_OF_UNITS add constraint FK_COMPOSITE_UNIT foreign key (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table COMPOSITE_STATE add constraint FK_COMPOSITE_STATE foreign key (DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table COMPOSITE_STATE add constraint FK_EMBEDDED_STATE foreign key (STA_DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table CONTACTS add constraint FK_CITY foreign key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
      references POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR) on delete restrict on update restrict;

alter table CONTACTS add constraint FK_CONTACT_DATA foreign key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table CONTACTS add constraint FK_CONTACT_TYPE foreign key (TKO_OZNAKA)
      references CONTACT_TYPE (TKO_OZNAKA) on delete restrict on update restrict;

alter table CONTRACT_HISTORY add constraint FK_CONTRACT_HISTORY foreign key (TIP_UST, EMP_VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA)
      references DOCCUMENTS_OF_EMPLOYMENT (TIP_UST, VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA) on delete restrict on update restrict;

alter table CONTRACT_HISTORY add constraint FK_CONTRACT_HISTORY2 foreign key (TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table COURSE add constraint FK_RUN_COURSES foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table COURSES_IN_BLOCK add constraint FK_COURSES_IN_BLOCK foreign key (TIP_UST, CUR_VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA, ON_OZNAKA, BLOKN_REDNI_BROJ)
      references CURRICULUM_STRUCTURE (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA, ON_OZNAKA, BLOKN_REDNI_BROJ) on delete restrict on update restrict;

alter table COURSES_IN_BLOCK add constraint FK_COURSES_IN_BLOCK2 foreign key (TIP_UST, CUR_VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA)
      references COURSE (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA) on delete restrict on update restrict;

alter table COVERED_COMPETENCIES add constraint FK_COVERED_COMPETENCIES foreign key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
      references REGISTERED_CURRICULUMS (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA) on delete restrict on update restrict;

alter table COVERED_COMPETENCIES add constraint FK_COVERED_COMPETENCIES2 foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA)
      references COMPETENCE (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA) on delete restrict on update restrict;

alter table COVERED_EDUCATION_SUBGROUPS add constraint FK_COVERED_EDUCATION_SUBGROUPS foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST)
      references EDUCATION_SUBGROUPS (PO_POLJE, GRU_GRUPA, OBL_OBLAST) on delete restrict on update restrict;

alter table COVERED_EDUCATION_SUBGROUPS add constraint FK_COVERED_EDUCATION_SUBGROUPS2 foreign key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
      references REGISTERED_CURRICULUMS (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA) on delete restrict on update restrict;

alter table COVERES_COMPETENCES add constraint FK_COVERES_COMPETENCES foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA)
      references COMPETENCE (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA) on delete restrict on update restrict;

alter table COVERES_COMPETENCES add constraint FK_COVERES_COMPETENCES2 foreign key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, VID_VID, EPL_WEEK)
      references EDUCATION_PLAN (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, VID_VID, EPL_WEEK) on delete restrict on update restrict;

alter table CURRICULUM_LEVEL add constraint FK_LEVEL_BASED_PROFESSION foreign key (SN_OZNAKA)
      references PROFESSIONS (SN_OZNAKA) on delete restrict on update restrict;

alter table CURRICULUM_LEVEL add constraint FK_WITH_LEVELS foreign key (STS_OZNAKA)
      references CURRICULUM_DEGREE (STS_OZNAKA) on delete restrict on update restrict;

alter table CURRICULUM_STRUCTURE add constraint FK_CURRICULUM_BLOCKS foreign key (ON_OZNAKA)
      references TYPE_OF_BLOCK (ON_OZNAKA) on delete restrict on update restrict;

alter table CURRICULUM_STRUCTURE add constraint FK_CURRICULUM_STRUCTURE foreign key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
      references REGISTERED_CURRICULUMS (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA) on delete restrict on update restrict;

alter table DOCCUMENTS_OF_EMPLOYMENT add constraint FK_CONTRACTS_PROTOCOL foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table DOCCUMENTS_OF_EMPLOYMENT add constraint FK_TYPED_DOCUMENT foreign key (VD_OZNAKA)
      references DOCUMENT_TYPE (VD_OZNAKA) on delete restrict on update restrict;

alter table DOCUMENT_INSTANCE add constraint FK_CURRICULUM_DOCUMENTATION foreign key (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA)
      references REGISTERED_CURRICULUMS (TIP_UST, VU_IDENTIFIKATOR, TIPP_TIP, SP_EVIDENCIONI_BROJ, SP_VERZIJA) on delete restrict on update restrict;

alter table DOCUMENT_INSTANCE add constraint FK_IN_CURRICULUM_INSTANCE foreign key (DOC_ID)
      references DOCUMENT_PART (DOC_ID) on delete restrict on update restrict;

alter table EDUCATION_GROUPS add constraint FK_CONTAINE_GROUPS foreign key (PO_POLJE)
      references EDUCATION_FIELDS (PO_POLJE) on delete restrict on update restrict;

alter table EDUCATION_PLAN add constraint FK_EDUCATION_SCHRDULE foreign key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA)
      references COURSE (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA) on delete restrict on update restrict;

alter table EDUCATION_PLAN add constraint FK_FOR_TYPE foreign key (VID_VID)
      references LECTURING_TYPE (VID_VID) on delete restrict on update restrict;

alter table EDUCATION_SUBGROUPS add constraint FK_HAVE_SUBGROUPS foreign key (PO_POLJE, GRU_GRUPA)
      references EDUCATION_GROUPS (PO_POLJE, GRU_GRUPA) on delete restrict on update restrict;

alter table ELECTIVE_COURSEC add constraint FK_ELECTIVE_COURSE foreign key (TIP_UST, VU_IDENTIFIKATOR, COU_NP_PREDMET, COU_NP_VERZIJA)
      references COURSE (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA) on delete restrict on update restrict;

alter table ELECTIVE_COURSEC add constraint FK_ELECTIVE_POOL foreign key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA)
      references COURSE (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA) on delete restrict on update restrict;

alter table EMPLOYEES add constraint FK_ALSO_EMPLOYEED foreign key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RCP_REDNI_BROJ)
      references RELATIVES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, RCP_REDNI_BROJ) on delete restrict on update restrict;

alter table EMPLOYEES add constraint FK_EMPLOYEED foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table EMPLOYEE_ENGAGEMEENT add constraint FK_APPOINTED_PERSONS_AT_WP foreign key (EMP_TIP_UST, EMP_VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table EMPLOYEE_ENGAGEMEENT add constraint FK_ENGAGED_AT foreign key (EMP_TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table EMPLOYEE_ENGAGEMEENT add constraint FK_ENGAGEMENT_TYPE foreign key (VRO_OZNAKA)
      references ENGAGEMENT_CATEGORY (VRO_OZNAKA) on delete restrict on update restrict;

alter table EMPLOYEE_ENGAGEMEENT add constraint FK_WHO_IS_APPOINTED_AT foreign key (EMP_TIP_UST, EMP_VU_IDENTIFIKATOR, RM_OZNAKA)
      references WORK_POSSITIONS (TIP_UST, VU_IDENTIFIKATOR, RM_OZNAKA) on delete restrict on update restrict;

alter table FOUND_FOR_TYPE add constraint FK_FUNDS foreign key (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA)
      references COURSE (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA) on delete restrict on update restrict;

alter table FOUND_FOR_TYPE add constraint FK_FUND_FOR_TYPE foreign key (VID_VID)
      references LECTURING_TYPE (VID_VID) on delete restrict on update restrict;

alter table HIGH_EDUCATION_INSTITUTION add constraint FK_HAS_AN_FACULRY_INSTITUTION foreign key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
      references POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR) on delete restrict on update restrict;

alter table HIGH_EDUCATION_INSTITUTION add constraint FK_REGISTRATED_INSTITUTIONS foreign key (DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table HIGH_EDUCATION_INSTITUTION add constraint FK_TYPED_INSTITUTION foreign key (TIP_UST)
      references TYPES_OF_INSTITUTIONS (TIP_UST) on delete restrict on update restrict;

alter table HIGH_EDUCATION_INSTITUTION add constraint FK_TYPE_OF_OWNERSHIP foreign key (VV_OZNAKA)
      references OWNERSHIP_TYPE (VV_OZNAKA) on delete restrict on update restrict;

alter table HISTORY_DATA add constraint FK_AFFILIATION foreign key (TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table HISTORY_DATA add constraint FK_ENGAGEMENT_AS foreign key (VRO_OZNAKA)
      references ENGAGEMENT_CATEGORY (VRO_OZNAKA) on delete restrict on update restrict;

alter table HISTORY_DATA add constraint FK_RADILI_KOD foreign key (PL_OZNAKA)
      references OTHER_INSTITUTIONS (PL_OZNAKA) on delete restrict on update restrict;

alter table HISTORY_DATA add constraint FK_WP_HISTORY foreign key (TIP_UST, EMP_VU_IDENTIFIKATOR, RM_OZNAKA)
      references WORK_POSSITIONS (TIP_UST, VU_IDENTIFIKATOR, RM_OZNAKA) on delete restrict on update restrict;

alter table INSTITUTION_STRUCTURE add constraint FK_INSTITUTION_STRUCTURE foreign key (TIP_UST, ACT_VU_IDENTIFIKATOR, AO_REDNI_BROJ)
      references ACT_OF_ORGANIZATION (TIP_UST, VU_IDENTIFIKATOR, AO_REDNI_BROJ) on delete restrict on update restrict;

alter table INSTITUTION_STRUCTURE add constraint FK_WHO_IS_IN_ORGANIZATION foreign key (EMBEDED_INSTITUTION_TYPE, EMBEDDED_INSTITUTION_ID)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table INTERNAL_STRUCTURE add constraint FK_EMBEDDED_PART foreign key (DOC_ID)
      references DOCUMENT_PART (DOC_ID) on delete restrict on update restrict;

alter table INTERNAL_STRUCTURE add constraint FK_STRUCTURED_PART foreign key (DOC_DOC_ID)
      references DOCUMENT_PART (DOC_ID) on delete restrict on update restrict;

alter table MANAGEMENT_SCHEMA add constraint FK_MANAGEME_MANAGEMEN_MANAGEM2 foreign key (POZ_OZNAKA)
      references MANAGEMENT_POSITIONS (POZ_OZNAKA) on delete restrict on update restrict;

alter table MANAGEMENT_SCHEMA add constraint FK_MANAGEMENT_SCHEMA2 foreign key (HIG_TIP_UST, VU_IDENTIFIKATOR, RS_IDENTIFIKATOR)
      references MANAGEMENT_STRUCTURE (HIG_TIP_UST, VU_IDENTIFIKATOR, RS_IDENTIFIKATOR) on delete restrict on update restrict;

alter table MANAGEMENT_STRUCTURE add constraint FK_FORMED_BY foreign key (HIG_TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table MANAGEMENT_STRUCTURE add constraint FK_MANAGEMENT foreign key (HIG_TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table OFFICTIAL_LANGUAGES add constraint FK_OFFICTIAL_LANGUAGES foreign key (DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table OFFICTIAL_LANGUAGES add constraint FK_OFFICTIAL_LANGUAGES_IN_STATE foreign key (JEZ_JEZIK)
      references LANGUAGES (JEZ_JEZIK) on delete restrict on update restrict;

alter table ORGANIZATIONAL_UNIT add constraint FK_INTERNAL_ORGANIZATION foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table ORGANIZATIONAL_UNIT add constraint FK_SEDISTE_JEDINICE foreign key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
      references POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR) on delete restrict on update restrict;

alter table OTHER_INSTITUTIONS add constraint FK_LOCATED_IN foreign key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
      references POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR) on delete restrict on update restrict;

alter table POPULATED_PLACES add constraint FK_POPULATED_PLACES foreign key (DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table REGISTERED_CURRICULUMS add constraint FK_CURRICULUM_DEGREE_AND_LEVEL foreign key (STS_OZNAKA, NS_NIVO)
      references CURRICULUM_LEVEL (STS_OZNAKA, NS_NIVO) on delete restrict on update restrict;

alter table REGISTERED_CURRICULUMS add constraint FK_CURRICULUM_LANGUAGE foreign key (JEZ_JEZIK)
      references LANGUAGES (JEZ_JEZIK) on delete restrict on update restrict;

alter table REGISTERED_CURRICULUMS add constraint FK_CURRICULUM_PROFESSION foreign key (SN_OZNAKA)
      references PROFESSIONS (SN_OZNAKA) on delete restrict on update restrict;

alter table REGISTERED_CURRICULUMS add constraint FK_REGISTERED_CURRICULUMS foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

alter table REGISTERED_CURRICULUMS add constraint FK_TYPED_CURRICULUMS foreign key (TIPP_TIP)
      references CURRICULUM_TYPE (TIPP_TIP) on delete restrict on update restrict;

alter table RELATIVES add constraint FK_FAMILY foreign key (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table RELATIVES add constraint FK_REALATED_AS foreign key (VSR_OZNAKA)
      references RELATION_TYPE (VSR_OZNAKA) on delete restrict on update restrict;

alter table RESPONSIBLE_MANAGER add constraint FK_RESPONSIBLE_MANAGER foreign key (DOC_TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ)
      references EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ) on delete restrict on update restrict;

alter table RESPONSIBLE_MANAGER add constraint FK_RESPONSIBLE_MANAGER2 foreign key (DOC_TIP_UST, VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA)
      references DOCCUMENTS_OF_EMPLOYMENT (TIP_UST, VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA) on delete restrict on update restrict;

alter table `SCHEMA` add constraint FK_SCHEMA_IN_ACT foreign key (TIP_UST, ACT_VU_IDENTIFIKATOR, AO_REDNI_BROJ)
      references ACT_OF_ORGANIZATION (TIP_UST, VU_IDENTIFIKATOR, AO_REDNI_BROJ) on delete restrict on update restrict;

alter table `SCHEMA` add constraint FK_UN_IT_IN_SCHEMA foreign key (TIP_UST, ACT_VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR)
      references ORGANIZATIONAL_UNIT (TIP_UST, VU_IDENTIFIKATOR, OJ_IDENTIFIKATOR) on delete restrict on update restrict;

alter table STATE add constraint FK_LEGAL_SUCCESSOR foreign key (STA_DR_IDENTIFIKATOR)
      references STATE (DR_IDENTIFIKATOR) on delete restrict on update restrict;

alter table STATE add constraint FK_STATE_CAPITAL foreign key (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR)
      references POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR) on delete restrict on update restrict;

alter table STRUCTURED_CATEGORIES add constraint FK_EMBEDDED_CATEGORY foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KAT_KOMP_KATEGORIJA)
      references COMPETENCE_CATEGORY (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA) on delete restrict on update restrict;

alter table STRUCTURED_CATEGORIES add constraint FK_REFERENCE_35 foreign key (COM_PO_POLJE, COM_GRU_GRUPA, COM_OBL_OBLAST, COM_KOMP_KATEGORIJA)
      references COMPETENCE_CATEGORY (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA) on delete restrict on update restrict;

alter table STRUCTURED_CATEGORIES add constraint FK_STRUCTUR_STRUCTURE_COMPETE2 foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA)
      references COMPETENCE_CATEGORY (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA) on delete restrict on update restrict;

alter table STRUCTURED_COMPETENCE add constraint FK_STRUCTUR_STRUCTURE_COMPETE3 foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA)
      references COMPETENCE (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA) on delete restrict on update restrict;

alter table STRUCTURED_COMPETENCE add constraint FK_STRUCTURED_COMPETENCE2 foreign key (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, COM_KO_KOMPETENCIJA)
      references COMPETENCE (PO_POLJE, GRU_GRUPA, OBL_OBLAST, KOMP_KATEGORIJA, KO_KOMPETENCIJA) on delete restrict on update restrict;

alter table WORK_POSSITIONS add constraint FK_WORK_POSSITIONS foreign key (TIP_UST, VU_IDENTIFIKATOR)
      references HIGH_EDUCATION_INSTITUTION (TIP_UST, VU_IDENTIFIKATOR) on delete restrict on update restrict;

/*==============================================================*/
/* Institution types and ownerships                             */
/*==============================================================*/

INSERT INTO OWNERSHIP_TYPE (VV_OZNAKA, VV_NAZIV) VALUES ("PB", "Public");
INSERT INTO OWNERSHIP_TYPE (VV_OZNAKA, VV_NAZIV) VALUES ("PR", "Private");
INSERT INTO TYPES_OF_INSTITUTIONS (TIP_UST, TIP_NAZIV) VALUES ("HS", "High School");
INSERT INTO TYPES_OF_INSTITUTIONS (TIP_UST, TIP_NAZIV) VALUES ("UN", "University");


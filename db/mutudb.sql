-----------------------------------TAULUJEN LUONTI----------------------------------------------------

CREATE TABLE koekalastukset
(
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	nimi VARCHAR(20) --MIKÄ PITUUS?
);

CREATE TABLE koealat
(
	id INTEGER PRIMARY KEY AUTOINCREMENT , --HALUSI TUON ID:N AUTOINCREMENTIN JÄLKEEN
	nimi VARCHAR(20), --MIKÄ PITUUS?
	kkid INTEGER,
	ei_saalista BOOLEAN,
	on_templaatti BOOLEAN,
	FOREIGN KEY (kkid) REFERENCES koekalastukset(id)
);

CREATE TABLE saaliit (
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	laji VARCHAR(20),
	mittaustyyppi INTEGER, --KOODI, ESIM 1 PAINO YKSILÖITTÄIN, 2 YHTEISPAINO YMS.
	pituus INTEGER,
	paino INTEGER,
	lukumaara INTEGER, -- JOS YHTEISPAINO
	kaid INTEGER,
	FOREIGN KEY (kaid) REFERENCES koealat(id)
	--PLUS LISÄKENTÄT sominaisuudet-taulusta haluttaessa?
);

CREATE TABLE kkominaisuudet (
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	kkominaisuus VARCHAR(100));--MIKÄ PITUUS?
	--datatyyppi VARCHAR(10) -- TOIMISKO NÄIN? ELI KERTOIS MITÄ TYYPPIÄ OMINAISUUDEN DATA ON; JA SE SIJOTETTAIS SIT EN MUKAAN OIKEENLAISEEN SARAKKEESEEN LINKISSÄ. VOI OLLA PAASKAA

CREATE TABLE kaominaisuudet (
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	kaominaisuus VARCHAR(20)
);

CREATE TABLE somiaisuudet ( --ELI CUSTOM-LISÄKENTTIÄ SAALIIT-TAULUUN, TARVIIKO OMAN TAULUN?? Sillon voi lisätä vain tietyille saaliskaloille/nipuille ominaisuuksia, ettei kaikille
	id INTEGER PRIMARY KEY AUTOINCREMENT ,
	sominaisuus VARCHAR(20)
);

CREATE TABLE link_koekalastukset_kkominaisuudet
(
	id_koekalastukset INTEGER,
	id_kkominaisuudet INTEGER,
	tiedot VARCHAR(100),
	FOREIGN KEY (id_koekalastukset) REFERENCES koekalastukset(id) ON DELETE SET NULL,
	FOREIGN KEY (id_kkominaisuudet) REFERENCES kkominaisuudet(id) ON DELETE SET NULL,
	PRIMARY KEY(id_koekalastukset,id_kkominaisuudet)
);

CREATE TABLE link_koelalat_kaominaisuudet
(
	id_koealat INTEGER,
	id_kaominaisuudet INTEGER,
	tiedot VARCHAR(100),
	FOREIGN KEY (id_koealat) REFERENCES koealat(id) ON DELETE SET NULL,
	FOREIGN KEY (id_kaominaisuudet) REFERENCES kaominaisuudet(id) ON DELETE SET NULL,
	PRIMARY KEY (id_koealat,id_kaominaisuudet)
);


CREATE TABLE link_saaliit_sominaisuudet
(
	id_saaliit INTEGER,
	id_sominaisuudet INTEGER,
	tiedot VARCHAR(100),
	FOREIGN KEY (id_saaliit) REFERENCES saaliit(id) ON DELETE SET NULL,
	FOREIGN KEY (id_sominaisuudet) REFERENCES sominaisuudet(id) ON DELETE SET NULL,
	PRIMARY KEY (id_saaliit,id_sominaisuudet)
);

/*CREATE TABLE link_koealat_saaliit
(
	id_koealat INTEGER,
	id_saaliit INTEGER,
	FOREIGN KEY (id_koealat) REFERENCES koealat(id) ON DELETE SET NULL,
	FOREIGN KEY (id_saaliit) REFERENCES saaliit(id) ON DELETE SET NULL,
	PRIMARY KEY (id_koealat,id_saaliit)
);*/

/*CREATE TABLE link_koekalastukset_koealat
(
	id_koekalastukset INTEGER, 
	id_koealat INTEGER,
	FOREIGN KEY (id_koekalastukset) REFERENCES koekalastukset(id) ON DELETE SET NULL, --VAI CASCADE? KUULUKO TÄHÄN VAI PRIMA KEY -KOHTAAN?
	FOREIGN KEY (id_koealat) REFERENCES koealat(id) ON DELETE SET NULL,
	PRIMARY KEY(id_koekalastukset,id_koealat)
);*/

-----------------------------------AUTOINCREMENT ID SEQ SÄÄTÖ-------------------------------
--LAKANNUT TOIMIMASTA??

UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'koekalastukset';
UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'koealat';
UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'kkominaisuudet';
UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'kaominaisuudet';
UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'saaliit';
UPDATE sqlite_sequence SET seq = 100 WHERE NAME = 'sominaisuudet';

-----------------------------------VALMIIDEN ENTRYJEN LUONTI--------------------------------

-----------------------------------TESTIJORINAA---------------------------------------------

--MOCK DATA---

INSERT INTO koekalastukset(nimi) VALUES ('Vermasjärvi');
INSERT INTO koekalastukset(nimi) VALUES ('Karvia 2');
INSERT INTO koealat VALUES (null, "Köhniö", null, false, true);
INSERT INTO koealat VALUES (null, "Kristokoski", 1, false, false);

/*
--MUISTISÄÄNTÖJÄ--

sqlitebrowser database.db 

SELECT * FROM sqlite_master;

SELECT nimi AS millä otsikolla haluat
FROM koekalastukset
WHERE nimi <> 'Köhniö'
--WHERE nimi IN (x,y,z)
ORDER BY nimi --ORDER BY DESC/ASC
LIMIT 1;

SELECT DISTINCT nimi --PALAUTTAA KAIKKI ERILAISET nimi-INSTANSSIT
FROM koekalastukset;

SELECT COUNT (nimi) --PALAUTTAA MONTAKO VALITTUA ENTRYÄ ON
FROM koekalastukset;
WHEREEN SAA LISÄÄ EHTOJA

SELECT *               --WILDCARD-SEARCH!! % == anything, _ == any char
FROM koekalastukset
WHERE nimi LIKE '%koski';

SELECT a FROM x UNION SELECT b FROM y

AVG(), SUM(), GROUP BY NÄYTTÄÄ TOSI HÄNDYLTÄ - CHECK SYNTAX

SELECT sql FROM sqlite_master WHERE name = 'koekalastukset';

INSERT INTO koekalastukset(nimi) VALUES ('Könkkö'); -- KOSKA ID AUTOINCREMENTTAA, PAKKO SPESIFOIDA MITÄ ANNETAAN KUN ID:TÄ EI VIITTIS ANTAA
INSERT INTO koekalastukset(nimi,hapan) VALUES ('Kyrösjärvi','Kaameeta roskaa');

UPDATE koekalastukset
SET nimi = 'Köhniö'
WHERE nimi = 'Karvia 2' OR 'Karvia 3';
Where x == NULL ==> WHERE x IS NULL

ALTER TABLE koekalastukset ADD hapan VARCHAR(20); -- EI VOI DROPPAA, AINOOSTAAN ADDAA

DELETE FROM koekalastukset
WHERE hapan IS NULL;

SELECT 'DROP TABLE' || name || ';' from sqlite_master --LUO SKRIPTIN JOKA POISTAA KAIKKI KENTÄT
    where type = 'table';

"If the AUTOINCREMENT keyword appears after INTEGER PRIMARY KEY, that changes the automatic ROWID assignment algorithm to prevent the reuse of ROWIDs over the lifetime of the database. In other words, the purpose of AUTOINCREMENT is to prevent the reuse of ROWIDs from previously deleted rows."
*/
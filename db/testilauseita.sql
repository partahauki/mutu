select seq from sqlite_sequence where name="koekalastukset";

select * from koekalastukset;

INSERT INTO koekalastukset VALUES(44,'Karibia','harambe');

DELETE FROM koekalastukset WHERE id=98;
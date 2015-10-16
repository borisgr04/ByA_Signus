ALTER TABLE SL_TIPOPER
MODIFY(NOM_TIP VARCHAR2(20 BYTE));

Insert into SL_TIPOPER
   (COD_TIP, NOM_TIP)
 Values
   ('PN', 'Persona Natural');
Insert into SL_TIPOPER
   (COD_TIP, NOM_TIP)
 Values
   ('PJ', 'Persona Jurídica');
COMMIT;
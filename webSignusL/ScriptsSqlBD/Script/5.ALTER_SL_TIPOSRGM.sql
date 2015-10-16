ALTER TABLE SL_TIPORGM
MODIFY(NOM_TIP VARCHAR2(22 BYTE));

SET DEFINE OFF;
Insert into SL_TIPORGM
   (COD_TIP, NOM_TIP)
 Values
   ('RC', 'Régimen Común');
Insert into SL_TIPORGM
   (COD_TIP, NOM_TIP)
 Values
   ('RS', 'Régimen Simplificado');
COMMIT;

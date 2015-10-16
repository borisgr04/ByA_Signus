Begin
v.usap:='admin';
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('10', 'Medios Magn�ticos', 'Medios Magn�ticos', '10', 1, 1, '-', 'MEDMG', 'MEDMG', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('1010', 'Medios Magn�ticos', 'Medios Magn�ticos', '10', 1, 1, '/MediosMagneticos/MediosMagneticos.aspx', 'MEDMG', 'MEDMG', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('8', 'Seguridad', 'Seguridad', '8', 1, 1, '-', 'ADMSG', 'ADMSG', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('815', 'Consulta Gobernaci�n', 'Consulta Gobernaci�n', '8', 2, 1, '/Estampillas/Consultas/ConsultaLEGov.aspx', 'ADMSG', 'ADMSGConsultaGov', '_self', 'N', 'admin', 'DERWEB', TO_DATE('05/11/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('05/11/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
COMMIT;
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('810', 'Usuarios', 'Usuarios', '8', 1, 1, '/Seguridad/gesUsuarios.aspx', 'ADMSG', 'ADMSGUsuarios', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('820', 'Orden Agentes', 'Orden Agentes', '8', 3, 1, '/OrdenAgentes/OrdenAgentes.aspx', 'ADMSG', 'ADMSGOrdenAge', '_self', 'N', 'admin', 'DERWEB', TO_DATE('05/11/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('05/11/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('825', 'Aplicaci�n Auditor', 'Aplicaci�n Auditor', '8', 4, 1, '/DescargaApp/AplicacionAuditor.aspx', 'ADMSG', 'ADMSGDesAuditor', '_self', 'N', 'admin', 'DERWEB', TO_DATE('05/27/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('05/27/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('9', 'Liquidaci�n', 'Liquidaci�n', '9', 1, 1, '-', 'SLQES', 'SLQES', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/20/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/20/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('910', 'Realizar Liquidaci�n', 'Realizar Liquidaci�n', '9', 2, 1, '/Estampillas/Liquidacion/Liquidacion.aspx', 'SLQES', 'SLQESLiqidacion', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('915', 'Realizar Pago', 'Realizar Pago', '9', 3, 1, '/Estampillas/Pagos/Pagos.aspx', 'SLQES', 'SLQESPagos', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));

Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('926', 'Anular Liquidaci�n', 'Anular Liquidaci�n', '9', 5, 1, '/Estampillas/CancelarLiquidacion/CancelarLiquidacion.aspx', 'SLQES', 'SLQESCanLiq', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('935', 'Anular Pago', 'Anular Pago', '9', 6, 1, '/Estampillas/CancelarPago/CancelarPago.aspx', 'SLQES', 'SLQESCanPag', '_self', 'N', 'ADMIN', 'DERWEB', TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('04/24/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
COMMIT;
End;
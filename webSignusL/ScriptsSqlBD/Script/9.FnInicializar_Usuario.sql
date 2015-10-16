CREATE OR REPLACE FUNCTION FnInicializar_Usuario(U Varchar2) Return VArchar2 Is
Begin 
V.USAP:=U;
return V.USAP;
End;
ALTER TABLE SL_LIQESTAMPILLAS ADD CONSTRAINT SL_TERCEROS_FK FOREIGN KEY (TER_NIT) REFERENCES SL_TERCEROS (TER_NIT);

ALTER TABLE SL_DETLIQ ADD CONSTRAINT SL_DETLIQ_LIQESTAMPILLAS_FK FOREIGN KEY (ID_LIQ) REFERENCES SL_LIQESTAMPILLAS (ID);
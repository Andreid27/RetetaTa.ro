USE retetata_ro;


DELIMITER $$

CREATE TRIGGER delete_ingredient_folosit
	BEFORE DELETE
    ON ingredient FOR EACH ROW
    BEGIN 
		DELETE FROM ingredient_cantitate WHERE ingredient_id=OLD.id;
	END$$  
        
DELIMITER ;




DELIMITER $$

CREATE TRIGGER delete_ingredient_cantitate_folosit
	BEFORE DELETE
    ON ingredient_cantitate FOR EACH ROW
    BEGIN 
		DELETE FROM reteta_ingredient_cantitate WHERE ingredient_cantitate_id=OLD.id;
	END$$  
        
DELIMITER ;
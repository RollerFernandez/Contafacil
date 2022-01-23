

CREATE SCHEMA IF NOT EXISTS dbcontafacil ;
USE dbcontafacil ;

-- -----------------------------------------------------
-- Table dbcontafacil.Family
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dbcontafacil.Family (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (id));


-- -----------------------------------------------------
-- Table dbcontafacil.Balance
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS dbcontafacil.Balance (
  id INT NOT NULL AUTO_INCREMENT,
  amount DECIMAL(15,2) NULL DEFAULT NULL,
  date DATETIME NULL DEFAULT NULL,
  familyId INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT Balance_ibfk_1
    FOREIGN KEY (familyId)
    REFERENCES dbcontafacil.Family (id));


USE dbcontafacil ;

-- -----------------------------------------------------
-- procedure sp_familysumary
-- -----------------------------------------------------

DELIMITER //

CREATE  PROCEDURE sp_familysumary(
	IN p_family int,
	IN p_year int,
	IN p_month varchar(100),
	IN p_datapoint varchar(200)
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION

	BEGIN
		SELECT 'Not valid request' AS message;
    END;
  SET lc_time_names = 'en_US';
  IF p_datapoint='min' THEN
   select
	 familyId as Id,
	  MIN(amount) min
	from Balance
	where familyId=p_family and  YEAR(date)=p_year AND MONTHNAME(date)=p_month
	group by familyId;
  ELSE IF p_datapoint='max' THEN
	 select
	 familyId as Id,
	  MAX(amount) max
	from Balance
	where familyId=p_family and  YEAR(date)=p_year AND MONTHNAME(date)=p_month
	group by familyId;
   ELSE IF p_datapoint='avg' THEN
	 select
	 familyId as Id,
	  avg(amount) as 'avg'
	from Balance
	where familyId=p_family and  YEAR(date)=p_year AND MONTHNAME(date)=p_month
	group by familyId;
  ELSE IF p_datapoint='total' THEN
		select
		   lista.Id,
		   SUM(lista.ingresos) -SUM(lista.egreso) total
		from (
			select
				familyId as Id,
				CASE WHEN (amount)>0 THEN SUM(amount) ELSE 0 END ingresos,
				CASE WHEN (amount)<0 THEN ABS(SUM(amount)) ELSE 0 END egreso
			from Balance
			where familyId=p_family and  YEAR(date)=p_year AND MONTHNAME(date)=p_month
			group by familyId,amount
			) lista group by lista.Id;
  ELSE
     select 'Not valid request' as messages;
  END IF;
  END IF;
  END IF;
  END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- procedure sp_familysumary_resumen
-- -----------------------------------------------------

DELIMITER //

CREATE  PROCEDURE sp_familysumary_resumen(
	IN p_family int,
	IN p_year int,
	IN p_datapoint varchar(200)
)
BEGIN

  DECLARE EXIT HANDLER FOR SQLEXCEPTION

	BEGIN
		SELECT 'Sorry error process ' AS message;
    END;

    SET lc_time_names = 'es_ES';


  IF p_datapoint='min' THEN
    select
		 MONTHNAME(date) mes,
		 MIN(amount) min
	 from Balance
	 where familyId=p_family and  YEAR(date)=p_year
	 group by MONTHNAME(date);
  ELSE IF p_datapoint='max' THEN
    select
		 MONTHNAME(date) mes,
		 MAX(amount) max
	 from Balance
	 where familyId=p_family and  YEAR(date)=p_year
	 group by MONTHNAME(date);
   ELSE IF p_datapoint='avg' THEN
    select
		 MONTHNAME(date) mes,
		 avg(amount) 'avg'
	 from Balance
	 where familyId=p_family and  YEAR(date)=p_year
	 group by MONTHNAME(date);
  ELSE IF p_datapoint='total' THEN
		select
		   mes,
		   SUM(lista.ingresos) -SUM(lista.egreso) total
		from (
			select
				MONTHNAME(date) mes,
				CASE WHEN (amount)>0 THEN SUM(amount) ELSE 0 END ingresos,
				CASE WHEN (amount)<0 THEN ABS(SUM(amount)) ELSE 0 END egreso
			from Balance
			where familyId=p_family and  YEAR(date)=p_year
			group by MONTHNAME(date),amount
			) lista group by lista.mes;
  ELSE
     select 'Not valid request' as messages;
  END IF;
  END IF;
  END IF;
  END IF;
END //

DELIMITER ;

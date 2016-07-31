-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.13-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

-- Dumping database structure for stockticker
CREATE DATABASE IF NOT EXISTS `stockticker` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `stockticker`;


-- Dumping structure for event stockticker.myevent
DELIMITER //
CREATE DEFINER=`root`@`localhost` EVENT `myevent` ON SCHEDULE EVERY 1 SECOND STARTS '2016-07-29 01:50:11' ON COMPLETION PRESERVE ENABLE DO CALL proc_stock_prices()//
DELIMITER ;

-- Dumping structure for procedure stockticker.proc_stock_prices
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_stock_prices`()
BEGIN
DECLARE done INT DEFAULT FALSE;
DECLARE i INTEGER;
DECLARE pr INTEGER;
DECLARE curs1 CURSOR FOR SELECT `id` FROM stocks;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
OPEN curs1;
read_loop: LOOP
FETCH curs1 INTO i;
IF done THEN
LEAVE read_loop;
END IF;
SET pr = (CAST(FLOOR(RAND() * 500) AS UNSIGNED));
WHILE (pr < 50 OR pr > 500) DO
	SET pr = (CAST(FLOOR(RAND() * 500) AS UNSIGNED));
END WHILE;

INSERT INTO stockprices(stockId, Price, Time) values (i, pr, NOW());
UPDATE stocks SET Price = pr WHERE ID = i;
END LOOP;
CLOSE curs1;
END//
DELIMITER ;

SET GLOBAL event_scheduler="ON";

-- Dumping structure for table stockticker.stockprices
CREATE TABLE IF NOT EXISTS `stockprices` (
  `ID` int(50) NOT NULL AUTO_INCREMENT,
  `stockId` int(50) NOT NULL,
  `Price` decimal(50,0) NOT NULL,
  `Time` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table stockticker.stockprices: ~0 rows (approximately)
DELETE FROM `stockprices`;
/*!40000 ALTER TABLE `stockprices` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockprices` ENABLE KEYS */;


-- Dumping structure for table stockticker.stocks
CREATE TABLE IF NOT EXISTS `stocks` (
  `Id` int(50) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Price` decimal(50,0) NOT NULL,
  `ImageUrl` varchar(200) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table stockticker.stocks: ~4 rows (approximately)
DELETE FROM `stocks`;
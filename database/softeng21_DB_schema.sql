-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema softeng21
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema softeng21
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `softeng21` ;
USE `softeng21` ;

-- -----------------------------------------------------
-- Table `softeng21`.`Vehicle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softeng21`.`Vehicle` (
  `vehicleID` VARCHAR(45) NOT NULL,
  `tagID` VARCHAR(45) NOT NULL,
  `tagProvider` VARCHAR(45) NOT NULL,
  `providerAbbr` VARCHAR(45) NOT NULL,
  `licenseYear` INT NOT NULL,
  PRIMARY KEY (`vehicleID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softeng21`.`Station`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softeng21`.`Station` (
  `stationID` VARCHAR(45) NOT NULL,
  `stationProvider` VARCHAR(45) NOT NULL,
  `stationName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`stationID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softeng21`.`Pass`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softeng21`.`Pass` (
  `passID` VARCHAR(45) NOT NULL,
  `timestamp` DATETIME NOT NULL,
  `charge` DOUBLE NOT NULL,
  `Station_stationID` VARCHAR(45) NOT NULL,
  `Vehicle_vehicleID` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`passID`),
  INDEX `fk_Pass_Station_idx` (`Station_stationID` ASC) VISIBLE,
  INDEX `fk_Pass_Vehicle1_idx` (`Vehicle_vehicleID` ASC) VISIBLE,
  CONSTRAINT `fk_Pass_Station`
    FOREIGN KEY (`Station_stationID`)
    REFERENCES `softeng21`.`Station` (`stationID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pass_Vehicle1`
    FOREIGN KEY (`Vehicle_vehicleID`)
    REFERENCES `softeng21`.`Vehicle` (`vehicleID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softeng21`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softeng21`.`User` (
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `userIdentity` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


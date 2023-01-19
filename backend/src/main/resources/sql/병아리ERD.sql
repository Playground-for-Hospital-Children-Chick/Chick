-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema housedata
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ssafydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ssafydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssafydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ssafydb` ;

-- -----------------------------------------------------
-- Table `ssafydb`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`user_info` (
  `mem_no` BIGINT NOT NULL AUTO_INCREMENT,
  `mem_id` VARCHAR(100) NOT NULL unique,
  `mem_pwd` VARCHAR(100) NOT NULL,
  `mem_ch_name` VARCHAR(10) NOT NULL,
  `mem_birth` VARCHAR(8) NOT NULL,
  `mem_sex` ENUM('M', 'F') NOT NULL,
  `mem_email` VARCHAR(50) NOT NULL,
  `mem_service_term` ENUM('Y', 'N') NOT NULL,
  `mem_privacy_term` ENUM('Y', 'N') NOT NULL,
  `mem_cur_profuser_infoile` VARCHAR(10) NOT NULL,
  `mem_state` tinyint default 0,
  `mem_number_of_reports` tinyint default 0,
  `mem_role` VARCHAR(50) NOT NULL,
  `mem_create_by` VARCHAR(100) NOT NULL,
  `mem_create_date` DATETIME NOT NULL,
  `mem_update_by` VARCHAR(100) NOT NULL,
  `mem_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`mem_no`),
  UNIQUE INDEX `mem_id_UNIQUE` (`mem_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`daily_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`daily_log` (
  `log_id` BIGINT NOT NULL AUTO_INCREMENT,
  `mem_no` BIGINT NOT NULL,
  `log_play_time` INT NOT NULL,
  `log_play_date` DATETIME NOT NULL,
  `log_game_name` VARCHAR(100) NOT NULL,
  `log_create_by` VARCHAR(100) NOT NULL,
  `log_create_date` DATETIME NOT NULL,
  `log_update_by` VARCHAR(100) NOT NULL,
  `log_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`log_id`, `mem_no`),
  INDEX `FK_user_info_TO_daily_log_1` (`mem_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_daily_log_1`
    FOREIGN KEY (`mem_no`)
    REFERENCES `ssafydb`.`user_info` (`mem_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`profile` (
  `prof_no` BIGINT NOT NULL AUTO_INCREMENT,
  `mem_no` BIGINT NOT NULL,
  `prof_img` INT NOT NULL,
  `prof_img_path` VARCHAR(100) NOT NULL,
  `prof_create_by` VARCHAR(100) NOT NULL,
  `prof_create_date` DATETIME NOT NULL,
  `prof_update_by` VARCHAR(100) NOT NULL,
  `prof_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`prof_no`, `mem_no`),
  INDEX `FK_user_info_TO_profile_1` (`mem_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_profile_1`
    FOREIGN KEY (`mem_no`)
    REFERENCES `ssafydb`.`user_info` (`mem_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `ssafydb`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`report` (
  `report_no` BIGINT NOT NULL AUTO_INCREMENT,
  `mem_no` BIGINT NOT NULL,
  `report_reported_people` VARCHAR(10) NOT NULL,
  `report_reporter` VARCHAR(10) NOT NULL,
  `report_category` VARCHAR(10) NOT NULL,
  `report_reason` VARCHAR(100) NOT NULL,
  `report_create_by` VARCHAR(100) NOT NULL,
  `report_create_date` DATETIME NOT NULL,
   `report_handling` BOOLEAN default FALSE,
  PRIMARY KEY (`report_no`, `mem_no`),
  INDEX `FK_user_info_TO_report_1` (`mem_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_report_1`
    FOREIGN KEY (`mem_no`)
    REFERENCES `ssafydb`.`user_info` (`mem_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ssafydb`.`persistent_logins` (
  series VARCHAR(64) NOT NULL,
  username VARCHAR(64) NOT NULL,
  token VARCHAR(64) NOT NULL,
  last_used DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (series)
)
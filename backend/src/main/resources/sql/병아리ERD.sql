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
    `mem_email` VARCHAR(50) NOT NULL UNIQUE,
  `mem_pwd` VARCHAR(100) NOT NULL,
  `mem_ch_name` VARCHAR(10) NOT NULL,
    `mem_sex` ENUM('M', 'F') NOT NULL,
  `mem_birth` VARCHAR(8) NOT NULL,
  `mem_state` INT default 0,
  `mem_number_of_reports` INT default 0,
  `mem_service_term` ENUM('Y', 'N') NOT NULL,
  `mem_privacy_term` ENUM('Y', 'N') NOT NULL,
   `mem_role` VARCHAR(50) NOT NULL,
  `mem_cur_profile` VARCHAR(10) NOT NULL,
  `mem_create_by` VARCHAR(100) NOT NULL,
  `mem_create_date` DATETIME NOT NULL,
  `mem_update_by` VARCHAR(100) NOT NULL,
  `mem_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`mem_no`),
  UNIQUE INDEX `mem_email_UNIQUE` (`mem_email` ASC) VISIBLE)
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
  `rp_no` BIGINT NOT NULL AUTO_INCREMENT,
  `mem_no` BIGINT NOT NULL,
  `rp_reported_people` VARCHAR(10) NOT NULL,
  `rp_reporter` VARCHAR(10) NOT NULL,
  `rp_category` VARCHAR(10) NOT NULL,
  `rp_reason` VARCHAR(100) NOT NULL,
   `rp_handling` TINYINT DEFAULT 0,
  `rp_create_by` VARCHAR(100) NOT NULL,
  `rp_create_date` DATETIME NOT NULL,
    `rp_update_by` VARCHAR(100) NOT NULL,
  `rp_update_date` DATETIME NOT NULL,

  PRIMARY KEY (`rp_no`, `mem_no`),
  INDEX `FK_user_info_TO_report_1` (`mem_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_report_1`
    FOREIGN KEY (`mem_no`)
    REFERENCES `ssafydb`.`user_info` (`mem_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `ssafydb`.`auth_refresh_save` (
  id BIGINT NOT NULL,
  refresh_token VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
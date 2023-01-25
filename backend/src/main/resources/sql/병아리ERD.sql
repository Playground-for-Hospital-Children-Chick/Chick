-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
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
-- Table `ssafydb`.`auth_refresh_save`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`auth_refresh_save` (
  `id` BIGINT NOT NULL,
  `refresh_token` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`profile` (
  `prof_no` BIGINT NOT NULL,
  `prof_img` VARCHAR(10) NOT NULL,
  `prof_img_path` VARCHAR(100) NOT NULL,
  `prof_create_by` VARCHAR(100) NOT NULL,
  `prof_create_date` DATETIME NOT NULL,
  `prof_update_by` VARCHAR(100) NOT NULL,
  `prof_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`prof_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`user_info` (
  `user_no` BIGINT NOT NULL AUTO_INCREMENT,
  `prof_no` BIGINT NOT NULL,
  `user_email` VARCHAR(50) NOT NULL,
  `user_pwd` VARCHAR(100) NOT NULL,
  `user_ch_name` VARCHAR(10) NOT NULL,
  `user_parent_name` VARCHAR(10) NOT NULL,
  `user_sex` ENUM('M', 'F') NOT NULL,
  `user_birth` VARCHAR(8) NOT NULL,
  `user_state` INT NOT NULL,
  `user_number_of_reports` INT NOT NULL,
  `user_service_term` ENUM('Y', 'N') NOT NULL,
  `user_privacy_term` ENUM('Y', 'N') NOT NULL,
  `user_role` ENUM('Y', 'N') NOT NULL,
  `user_create_by` VARCHAR(100) NOT NULL,
  `user_create_date` DATETIME NOT NULL,
  `user_update_by` VARCHAR(100) NOT NULL,
  `user_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`user_no`, `prof_no`),
  INDEX `FK_profile_TO_user_info_1` (`prof_no` ASC) VISIBLE,
  CONSTRAINT `FK_profile_TO_user_info_1`
    FOREIGN KEY (`prof_no`)
    REFERENCES `ssafydb`.`profile` (`prof_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`daily_log`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`daily_log` (
  `log_id` BIGINT NOT NULL,
  `user_no` BIGINT NOT NULL,
  `log_game_name` VARCHAR(100) NOT NULL,
  `log_play_time` INT NOT NULL,
  `log_play_date` DATETIME NOT NULL,
  `log_create_by` VARCHAR(100) NOT NULL,
  `log_create_date` DATETIME NOT NULL,
  `log_update_by` VARCHAR(100) NOT NULL,
  `log_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`log_id`, `user_no`),
  INDEX `FK_user_info_TO_daily_log_1` (`user_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_daily_log_1`
    FOREIGN KEY (`user_no`)
    REFERENCES `ssafydb`.`user_info` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`report` (
  `rp_no` BIGINT NOT NULL,
  `user_no` BIGINT NOT NULL,
  `rp_reported_people` VARCHAR(10) NOT NULL,
  `rp_reporter` VARCHAR(10) NOT NULL,
  `rp_category` VARCHAR(10) NOT NULL,
  `rp_reason` VARCHAR(100) NOT NULL,
  `rp_handling` TINYINT NOT NULL,
  `rp_create_by` VARCHAR(100) NOT NULL,
  `rp_create_date` DATETIME NOT NULL,
  `rp_update_by` VARCHAR(100) NOT NULL,
  `rp_update_date` DATETIME NOT NULL,
  PRIMARY KEY (`rp_no`, `user_no`),
  INDEX `FK_user_info_TO_report_1` (`user_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_report_1`
    FOREIGN KEY (`user_no`)
    REFERENCES `ssafydb`.`user_info` (`user_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`room_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`room_info` (
  `room_id` BIGINT NOT NULL,
  `user_no` BIGINT NOT NULL,
  `prof_no` BIGINT NOT NULL,
  `room_cnt` INT NOT NULL,
  `room_type` VARCHAR(100) NOT NULL,
  `room_link` VARCHAR(100) NOT NULL,
  `romm_create_date` DATETIME NOT NULL,
  `room_update_by` VARCHAR(100) NOT NULL,
  `room_update_date` DATETIME NOT NULL,
  `maching_create_by` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`room_id`, `user_no`, `prof_no`),
  INDEX `FK_user_info_TO_room_info_1` (`user_no` ASC) VISIBLE,
  INDEX `FK_user_info_TO_room_info_2` (`prof_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_room_info_1`
    FOREIGN KEY (`user_no`)
    REFERENCES `ssafydb`.`user_info` (`user_no`),
  CONSTRAINT `FK_user_info_TO_room_info_2`
    FOREIGN KEY (`prof_no`)
    REFERENCES `ssafydb`.`user_info` (`prof_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ssafydb`.`wait_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ssafydb`.`wait_room` (
  `wait_no` BIGINT NOT NULL,
  `user_no` BIGINT NOT NULL,
  `prof_no` BIGINT NOT NULL,
  `wait_game_type` VARCHAR(100) NOT NULL,
  `wait_creat_date` DATETIME NOT NULL,
  PRIMARY KEY (`wait_no`, `user_no`, `prof_no`),
  INDEX `FK_user_info_TO_wait_room_1` (`user_no` ASC) VISIBLE,
  INDEX `FK_user_info_TO_wait_room_2` (`prof_no` ASC) VISIBLE,
  CONSTRAINT `FK_user_info_TO_wait_room_1`
    FOREIGN KEY (`user_no`)
    REFERENCES `ssafydb`.`user_info` (`user_no`),
  CONSTRAINT `FK_user_info_TO_wait_room_2`
    FOREIGN KEY (`prof_no`)
    REFERENCES `ssafydb`.`user_info` (`prof_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

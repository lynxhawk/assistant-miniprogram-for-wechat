/*
Navicat MySQL Data Transfer

Source Server         : cjw
Source Server Version : 50615
Source Host           : localhost:3306
Source Database       : personal_assistant

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2019-07-15 03:06:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_expenses
-- ----------------------------
DROP TABLE IF EXISTS `tbl_expenses`;
CREATE TABLE `tbl_expenses` (
  `exp_id` int(20) NOT NULL AUTO_INCREMENT,
  `exp_money` int(200) NOT NULL,
  `exp_type` varchar(50) NOT NULL,
  `exp_name` varchar(50) DEFAULT NULL,
  `exp_note` varchar(500) DEFAULT NULL,
  `exp_date` date NOT NULL,
  `user_id` int(200) NOT NULL,
  PRIMARY KEY (`exp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_expenses
-- ----------------------------
INSERT INTO `tbl_expenses` VALUES ('2', '100', 'test', null, null, '2019-07-13', '1');
INSERT INTO `tbl_expenses` VALUES ('4', '0', '饮食', '', null, '2019-07-14', '11');

-- ----------------------------
-- Table structure for tbl_income
-- ----------------------------
DROP TABLE IF EXISTS `tbl_income`;
CREATE TABLE `tbl_income` (
  `inc_id` int(20) NOT NULL AUTO_INCREMENT,
  `inc_money` int(200) NOT NULL,
  `inc_type` varchar(50) NOT NULL,
  `inc_name` varchar(50) DEFAULT NULL,
  `inc_note` varchar(500) DEFAULT NULL,
  `inc_date` date NOT NULL,
  `user_id` int(20) NOT NULL,
  PRIMARY KEY (`inc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_income
-- ----------------------------
INSERT INTO `tbl_income` VALUES ('2', '200', 'test', null, null, '2019-07-13', '1');
INSERT INTO `tbl_income` VALUES ('3', '300', 't2', null, null, '2019-07-12', '1');
INSERT INTO `tbl_income` VALUES ('5', '0', '工资', '', null, '2019-07-15', '11');

-- ----------------------------
-- Table structure for tbl_investment
-- ----------------------------
DROP TABLE IF EXISTS `tbl_investment`;
CREATE TABLE `tbl_investment` (
  `inv_id` int(20) NOT NULL AUTO_INCREMENT,
  `inv_name` varchar(50) NOT NULL,
  `inv_money` double(50,0) NOT NULL,
  `inv_profit_money` double(50,2) DEFAULT NULL,
  `inv_rate` double(10,2) NOT NULL,
  `inv_start_date` date NOT NULL,
  `inv_end_date` date DEFAULT NULL,
  `user_id` int(20) NOT NULL,
  PRIMARY KEY (`inv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_investment
-- ----------------------------
INSERT INTO `tbl_investment` VALUES ('2', '123', '5000', '250.00', '0.05', '2019-07-14', null, '11');
INSERT INTO `tbl_investment` VALUES ('3', '123', '5000', '1077.53', '0.05', '2019-07-10', null, '1');
INSERT INTO `tbl_investment` VALUES ('5', '', '666', '0.00', '0.50', '2019-07-15', null, '11');

-- ----------------------------
-- Table structure for tbl_invtype
-- ----------------------------
DROP TABLE IF EXISTS `tbl_invtype`;
CREATE TABLE `tbl_invtype` (
  `inv_name_id` int(20) NOT NULL AUTO_INCREMENT,
  `inv_name` varchar(20) NOT NULL,
  `inv_money_count` double(20,2) NOT NULL,
  `inv_pfmoney_count` double(20,2) NOT NULL,
  `user_id` int(20) NOT NULL,
  PRIMARY KEY (`inv_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_invtype
-- ----------------------------
INSERT INTO `tbl_invtype` VALUES ('1', '余额宝', '100.00', '10.00', '11');

-- ----------------------------
-- Table structure for tbl_photodiary
-- ----------------------------
DROP TABLE IF EXISTS `tbl_photodiary`;
CREATE TABLE `tbl_photodiary` (
  `phd_id` int(20) NOT NULL AUTO_INCREMENT,
  `phd_diary` varchar(100) NOT NULL,
  `phd_photo` mediumtext NOT NULL,
  `phd_position` varchar(100) NOT NULL,
  `phd_date` date NOT NULL,
  `user_id` int(20) NOT NULL,
  PRIMARY KEY (`phd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_photodiary
-- ----------------------------
INSERT INTO `tbl_photodiary` VALUES ('2', '天气真好', 'img/google-earth-view-1140.jpg', '789', '2019-07-13', '1');
INSERT INTO `tbl_photodiary` VALUES ('3', '天气真好', 'img/google-earth-view-1140.jpg', '7', '2019-07-13', '11');
INSERT INTO `tbl_photodiary` VALUES ('4', '天气真好', 'img/google-earth-view-1447.jpg', '123', '2019-01-01', '11');

-- ----------------------------
-- Table structure for tbl_schedule
-- ----------------------------
DROP TABLE IF EXISTS `tbl_schedule`;
CREATE TABLE `tbl_schedule` (
  `sc_id` int(20) NOT NULL AUTO_INCREMENT,
  `sc_name` varchar(50) NOT NULL,
  `sc_start_time` time(5) NOT NULL,
  `sc_end_time` time(5) DEFAULT NULL,
  `sc_start_date` date NOT NULL,
  `sc_end_date` date DEFAULT NULL,
  `sc_repeat_type` varchar(20) DEFAULT NULL,
  `user_id` int(20) NOT NULL,
  `sc_repeat_times` int(20) DEFAULT NULL,
  `sc_remind_days` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_schedule
-- ----------------------------
INSERT INTO `tbl_schedule` VALUES ('12', '11', '10:00:00.00000', null, '2019-07-15', '2019-07-28', '每天重复', '11', '1', null);
INSERT INTO `tbl_schedule` VALUES ('13', '11', '10:00:00.00000', null, '2019-07-15', '2019-07-26', '每天重复', '11', '1', null);
INSERT INTO `tbl_schedule` VALUES ('14', '1', '10:00:00.00000', null, '2019-07-15', '2019-07-26', '每天重复', '11', '1', '2019-07-151,');
INSERT INTO `tbl_schedule` VALUES ('16', '取快递', '12:00:00.00000', null, '2019-07-16', '2019-07-18', '每天重复', '11', '2', '2019-07-function toString() { [native code] },2019-07-function toString() { [native code] },');
INSERT INTO `tbl_schedule` VALUES ('17', '快递', '10:00:00.00000', null, '2019-07-16', '2019-07-17', '每天重复', '11', '2', '2019-07-17,2019-07-18,');
INSERT INTO `tbl_schedule` VALUES ('18', '打印', '10:00:00.00000', null, '2019-07-16', '2019-07-16', '每天重复', '11', '1', '2019-07-17,');
INSERT INTO `tbl_schedule` VALUES ('19', '1', '10:00:00.00000', null, '2019-07-13', '2019-07-17', '每天重复', '11', '5', '2019-07-19,2019-07-20,2019-07-21,2019-07-22,2019-07-23,');

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `exp_count` int(100) DEFAULT NULL,
  `inc_count` int(100) DEFAULT NULL,
  `inv_count` double(100,2) DEFAULT NULL,
  `inv_pfcount` double(100,2) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('4', '123', null, null, null, null);
INSERT INTO `tbl_user` VALUES ('5', '456', null, null, null, null);
INSERT INTO `tbl_user` VALUES ('10', '467', null, null, null, null);
INSERT INTO `tbl_user` VALUES ('11', '湛泸', null, null, '100.00', '100.00');

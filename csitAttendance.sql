-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: attendance
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_academiclevel`
--

DROP TABLE IF EXISTS `app_academiclevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_academiclevel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `academiclevel` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_academiclevel`
--

LOCK TABLES `app_academiclevel` WRITE;
/*!40000 ALTER TABLE `app_academiclevel` DISABLE KEYS */;
INSERT INTO `app_academiclevel` VALUES (1,'Post Graduate'),(2,'Under Graduate'),(3,'Diploma'),(4,'Certification'),(5,'PHD');
/*!40000 ALTER TABLE `app_academiclevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_attendance`
--

DROP TABLE IF EXISTS `app_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` longblob NOT NULL,
  `session_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_attendance_session_id_db88754c_fk_app_session_id` (`session_id`),
  KEY `app_attendance_student_id_e9880899_fk_app_student_id` (`student_id`),
  CONSTRAINT `app_attendance_session_id_db88754c_fk_app_session_id` FOREIGN KEY (`session_id`) REFERENCES `app_session` (`id`),
  CONSTRAINT `app_attendance_student_id_e9880899_fk_app_student_id` FOREIGN KEY (`student_id`) REFERENCES `app_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_attendance`
--

LOCK TABLES `app_attendance` WRITE;
/*!40000 ALTER TABLE `app_attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_biometric`
--

DROP TABLE IF EXISTS `app_biometric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_biometric` (
  `biometric` longtext,
  `student_id` bigint NOT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `app_biometric_student_id_c854356f_fk_app_student_id` FOREIGN KEY (`student_id`) REFERENCES `app_student` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_biometric`
--

LOCK TABLES `app_biometric` WRITE;
/*!40000 ALTER TABLE `app_biometric` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_biometric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_classtype`
--

DROP TABLE IF EXISTS `app_classtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_classtype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `deliverymode_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `app_classtype_deliverymode_id_201d6512_fk_app_deliverymode_id` (`deliverymode_id`),
  KEY `app_classtype_subject_id_3ec049d8_fk_app_subject_id` (`subject_id`),
  CONSTRAINT `app_classtype_deliverymode_id_201d6512_fk_app_deliverymode_id` FOREIGN KEY (`deliverymode_id`) REFERENCES `app_deliverymode` (`id`),
  CONSTRAINT `app_classtype_subject_id_3ec049d8_fk_app_subject_id` FOREIGN KEY (`subject_id`) REFERENCES `app_subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_classtype`
--

LOCK TABLES `app_classtype` WRITE;
/*!40000 ALTER TABLE `app_classtype` DISABLE KEYS */;
INSERT INTO `app_classtype` VALUES (1,'IOTPRAC',2,1),(2,'IOTTHEORY',1,1);
/*!40000 ALTER TABLE `app_classtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_deliverymode`
--

DROP TABLE IF EXISTS `app_deliverymode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_deliverymode` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `mode` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_deliverymode`
--

LOCK TABLES `app_deliverymode` WRITE;
/*!40000 ALTER TABLE `app_deliverymode` DISABLE KEYS */;
INSERT INTO `app_deliverymode` VALUES (1,'Theory'),(2,'Practical'),(3,'Research'),(4,'Guest Lecture'),(5,'Webinar'),(6,'Seminar');
/*!40000 ALTER TABLE `app_deliverymode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_department`
--

DROP TABLE IF EXISTS `app_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_department` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `discipline_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_department_discipline_id_5f2f83c8_fk_app_discipline_id` (`discipline_id`),
  CONSTRAINT `app_department_discipline_id_5f2f83c8_fk_app_discipline_id` FOREIGN KEY (`discipline_id`) REFERENCES `app_discipline` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_department`
--

LOCK TABLES `app_department` WRITE;
/*!40000 ALTER TABLE `app_department` DISABLE KEYS */;
INSERT INTO `app_department` VALUES (1,'Computer Science & Information Technology',1);
/*!40000 ALTER TABLE `app_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_discipline`
--

DROP TABLE IF EXISTS `app_discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_discipline` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `discipline` varchar(100) NOT NULL,
  `university_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_discipline_university_id_f016865e_fk_app_university_id` (`university_id`),
  CONSTRAINT `app_discipline_university_id_f016865e_fk_app_university_id` FOREIGN KEY (`university_id`) REFERENCES `app_university` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_discipline`
--

LOCK TABLES `app_discipline` WRITE;
/*!40000 ALTER TABLE `app_discipline` DISABLE KEYS */;
INSERT INTO `app_discipline` VALUES (1,'Science',1),(2,'Management',1),(3,'Humanities',1),(4,'Engineering',1),(5,'Arts',1),(6,'Commerce',1);
/*!40000 ALTER TABLE `app_discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_program`
--

DROP TABLE IF EXISTS `app_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_program` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `duration` int NOT NULL,
  `academiclevel_id` bigint NOT NULL,
  `department_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_program_academiclevel_id_f6adba52_fk_app_academiclevel_id` (`academiclevel_id`),
  KEY `app_program_department_id_d0623c8c_fk_app_department_id` (`department_id`),
  CONSTRAINT `app_program_academiclevel_id_f6adba52_fk_app_academiclevel_id` FOREIGN KEY (`academiclevel_id`) REFERENCES `app_academiclevel` (`id`),
  CONSTRAINT `app_program_department_id_d0623c8c_fk_app_department_id` FOREIGN KEY (`department_id`) REFERENCES `app_department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_program`
--

LOCK TABLES `app_program` WRITE;
/*!40000 ALTER TABLE `app_program` DISABLE KEYS */;
INSERT INTO `app_program` VALUES (1,'M. Sc. Computer Science',2,1,1),(2,'M. Sc. Artificial Intelligence',2,1,1);
/*!40000 ALTER TABLE `app_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_semester`
--

DROP TABLE IF EXISTS `app_semester`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_semester` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `semester` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `year_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_semester_year_id_058a828a_fk_app_year_id` (`year_id`),
  CONSTRAINT `app_semester_year_id_058a828a_fk_app_year_id` FOREIGN KEY (`year_id`) REFERENCES `app_year` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_semester`
--

LOCK TABLES `app_semester` WRITE;
/*!40000 ALTER TABLE `app_semester` DISABLE KEYS */;
INSERT INTO `app_semester` VALUES (1,4,'2025-09-01','2026-04-30',1);
/*!40000 ALTER TABLE `app_semester` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_session`
--

DROP TABLE IF EXISTS `app_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_session` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `timetable_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_session_timetable_id_a942e66c_fk_app_timetable_id` (`timetable_id`),
  CONSTRAINT `app_session_timetable_id_a942e66c_fk_app_timetable_id` FOREIGN KEY (`timetable_id`) REFERENCES `app_timetable` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_session`
--

LOCK TABLES `app_session` WRITE;
/*!40000 ALTER TABLE `app_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_stafftype`
--

DROP TABLE IF EXISTS `app_stafftype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_stafftype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `staffType` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_stafftype`
--

LOCK TABLES `app_stafftype` WRITE;
/*!40000 ALTER TABLE `app_stafftype` DISABLE KEYS */;
INSERT INTO `app_stafftype` VALUES (1,'Faculty Staff'),(2,'Professor'),(3,'PHD Scholar'),(4,'HOD');
/*!40000 ALTER TABLE `app_stafftype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_student`
--

DROP TABLE IF EXISTS `app_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_student` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `prn` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `rollNumber` varchar(100) NOT NULL,
  `semester_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prn` (`prn`),
  UNIQUE KEY `rollNumber` (`rollNumber`),
  KEY `app_student_semester_id_dcaf2a7f_fk_app_semester_id` (`semester_id`),
  CONSTRAINT `app_student_semester_id_dcaf2a7f_fk_app_semester_id` FOREIGN KEY (`semester_id`) REFERENCES `app_semester` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_student`
--

LOCK TABLES `app_student` WRITE;
/*!40000 ALTER TABLE `app_student` DISABLE KEYS */;
INSERT INTO `app_student` VALUES (4,'1','rohan magar','M','23',1),(5,'2','pranav Sirsufale','M','24',1);
/*!40000 ALTER TABLE `app_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_subject`
--

DROP TABLE IF EXISTS `app_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_subject` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `program_id` bigint NOT NULL,
  `semester_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_subject_program_id_8e1d9e17_fk_app_program_id` (`program_id`),
  KEY `app_subject_semester_id_4fa61bc3_fk_app_semester_id` (`semester_id`),
  CONSTRAINT `app_subject_program_id_8e1d9e17_fk_app_program_id` FOREIGN KEY (`program_id`) REFERENCES `app_program` (`id`),
  CONSTRAINT `app_subject_semester_id_4fa61bc3_fk_app_semester_id` FOREIGN KEY (`semester_id`) REFERENCES `app_semester` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_subject`
--

LOCK TABLES `app_subject` WRITE;
/*!40000 ALTER TABLE `app_subject` DISABLE KEYS */;
INSERT INTO `app_subject` VALUES (1,'IOT & Cloud',1,1);
/*!40000 ALTER TABLE `app_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_teacher`
--

DROP TABLE IF EXISTS `app_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_teacher` (
  `user_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `department_id` bigint NOT NULL,
  `staffType_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `app_teacher_department_id_51687460_fk_app_department_id` (`department_id`),
  KEY `app_teacher_staffType_id_b96f9ce8_fk_app_stafftype_id` (`staffType_id`),
  CONSTRAINT `app_teacher_department_id_51687460_fk_app_department_id` FOREIGN KEY (`department_id`) REFERENCES `app_department` (`id`),
  CONSTRAINT `app_teacher_staffType_id_b96f9ce8_fk_app_stafftype_id` FOREIGN KEY (`staffType_id`) REFERENCES `app_stafftype` (`id`),
  CONSTRAINT `app_teacher_user_id_d565d5e5_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_teacher`
--

LOCK TABLES `app_teacher` WRITE;
/*!40000 ALTER TABLE `app_teacher` DISABLE KEYS */;
INSERT INTO `app_teacher` VALUES (1,'pranav sirsufale','pranavsirsufale@gmail.com','09075272433',1,1,1),(2,'Ramesh Manza','pranavsirsufale@gmail.com','8482852301',1,1,4),(3,'Rohan Magar','rmtych@gmail.com','8308822538',0,1,2);
/*!40000 ALTER TABLE `app_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_timetable`
--

DROP TABLE IF EXISTS `app_timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_timetable` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `weekday` varchar(3) NOT NULL,
  `dateTime` datetime(6) NOT NULL,
  `classType_id` bigint NOT NULL,
  `semester_id` bigint NOT NULL,
  `teacher_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_timetable_classType_id_82af2185_fk_app_classtype_id` (`classType_id`),
  KEY `app_timetable_semester_id_fb49e488_fk_app_semester_id` (`semester_id`),
  KEY `app_timetable_teacher_id_a975a114_fk_app_teacher_user_id` (`teacher_id`),
  CONSTRAINT `app_timetable_classType_id_82af2185_fk_app_classtype_id` FOREIGN KEY (`classType_id`) REFERENCES `app_classtype` (`id`),
  CONSTRAINT `app_timetable_semester_id_fb49e488_fk_app_semester_id` FOREIGN KEY (`semester_id`) REFERENCES `app_semester` (`id`),
  CONSTRAINT `app_timetable_teacher_id_a975a114_fk_app_teacher_user_id` FOREIGN KEY (`teacher_id`) REFERENCES `app_teacher` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_timetable`
--

LOCK TABLES `app_timetable` WRITE;
/*!40000 ALTER TABLE `app_timetable` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_university`
--

DROP TABLE IF EXISTS `app_university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_university` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_university`
--

LOCK TABLES `app_university` WRITE;
/*!40000 ALTER TABLE `app_university` DISABLE KEYS */;
INSERT INTO `app_university` VALUES (1,'Dr. BAMU','bamu');
/*!40000 ALTER TABLE `app_university` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_year`
--

DROP TABLE IF EXISTS `app_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_year` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `program_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app_year_program_id_38c71a84_fk_app_program_id` (`program_id`),
  CONSTRAINT `app_year_program_id_38c71a84_fk_app_program_id` FOREIGN KEY (`program_id`) REFERENCES `app_program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_year`
--

LOCK TABLES `app_year` WRITE;
/*!40000 ALTER TABLE `app_year` DISABLE KEYS */;
INSERT INTO `app_year` VALUES (1,2,1);
/*!40000 ALTER TABLE `app_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add university',18,'add_university'),(26,'Can change university',18,'change_university'),(27,'Can delete university',18,'delete_university'),(28,'Can view university',18,'view_university'),(29,'Can add department',9,'add_department'),(30,'Can change department',9,'change_department'),(31,'Can delete department',9,'delete_department'),(32,'Can view department',9,'view_department'),(33,'Can add program',10,'add_program'),(34,'Can change program',10,'change_program'),(35,'Can delete program',10,'delete_program'),(36,'Can view program',10,'view_program'),(37,'Can add year',19,'add_year'),(38,'Can change year',19,'change_year'),(39,'Can delete year',19,'delete_year'),(40,'Can view year',19,'view_year'),(41,'Can add semester',11,'add_semester'),(42,'Can change semester',11,'change_semester'),(43,'Can delete semester',11,'delete_semester'),(44,'Can view semester',11,'view_semester'),(45,'Can add subject',15,'add_subject'),(46,'Can change subject',15,'change_subject'),(47,'Can delete subject',15,'delete_subject'),(48,'Can view subject',15,'view_subject'),(49,'Can add class type',8,'add_classtype'),(50,'Can change class type',8,'change_classtype'),(51,'Can delete class type',8,'delete_classtype'),(52,'Can view class type',8,'view_classtype'),(53,'Can add staff type',13,'add_stafftype'),(54,'Can change staff type',13,'change_stafftype'),(55,'Can delete staff type',13,'delete_stafftype'),(56,'Can view staff type',13,'view_stafftype'),(57,'Can add teacher',16,'add_teacher'),(58,'Can change teacher',16,'change_teacher'),(59,'Can delete teacher',16,'delete_teacher'),(60,'Can view teacher',16,'view_teacher'),(61,'Can add student',14,'add_student'),(62,'Can change student',14,'change_student'),(63,'Can delete student',14,'delete_student'),(64,'Can view student',14,'view_student'),(65,'Can add timetable',17,'add_timetable'),(66,'Can change timetable',17,'change_timetable'),(67,'Can delete timetable',17,'delete_timetable'),(68,'Can view timetable',17,'view_timetable'),(69,'Can add session',12,'add_session'),(70,'Can change session',12,'change_session'),(71,'Can delete session',12,'delete_session'),(72,'Can view session',12,'view_session'),(73,'Can add attendance',7,'add_attendance'),(74,'Can change attendance',7,'change_attendance'),(75,'Can delete attendance',7,'delete_attendance'),(76,'Can view attendance',7,'view_attendance'),(77,'Can add program type',20,'add_programtype'),(78,'Can change program type',20,'change_programtype'),(79,'Can delete program type',20,'delete_programtype'),(80,'Can view program type',20,'view_programtype'),(81,'Can add faculty',21,'add_faculty'),(82,'Can change faculty',21,'change_faculty'),(83,'Can delete faculty',21,'delete_faculty'),(84,'Can view faculty',21,'view_faculty'),(85,'Can add academic level',22,'add_academiclevel'),(86,'Can change academic level',22,'change_academiclevel'),(87,'Can delete academic level',22,'delete_academiclevel'),(88,'Can view academic level',22,'view_academiclevel'),(89,'Can add discipline',23,'add_discipline'),(90,'Can change discipline',23,'change_discipline'),(91,'Can delete discipline',23,'delete_discipline'),(92,'Can view discipline',23,'view_discipline'),(93,'Can add delivery mode',24,'add_deliverymode'),(94,'Can change delivery mode',24,'change_deliverymode'),(95,'Can delete delivery mode',24,'delete_deliverymode'),(96,'Can view delivery mode',24,'view_deliverymode'),(97,'Can add biometric',25,'add_biometric'),(98,'Can change biometric',25,'change_biometric'),(99,'Can delete biometric',25,'delete_biometric'),(100,'Can view biometric',25,'view_biometric');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$lPBkbNwGix8N4jAhC4LtNE$FN8vNrplLmPZpuLYNrPSzu0e/PDIAUY3xjkzMEF0cPk=',NULL,0,'pranav','','','pranavsirsufale@gmail.com',0,1,'2026-02-22 08:54:58.431873'),(2,'pbkdf2_sha256$1200000$ZcyE2sCE5quSmeFWNOrREm$+Wlr6CV89oigJ6HnnDg9PhdmOBwhKceTW+rteSl2qMo=',NULL,0,'rrmanza','','','pranavsirsufale@gmail.com',0,1,'2026-02-22 08:59:35.864552'),(3,'pbkdf2_sha256$1200000$cWZvgIpgSNpoCdnlB2W2aw$MSAigCh45aTkEXxDzSgxedsa+D8HsK0CVM5zAyzNxck=',NULL,0,'magarohan','','','rmtych@gmail.com',0,1,'2026-02-22 09:57:20.710638');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(22,'app','academiclevel'),(7,'app','attendance'),(25,'app','biometric'),(8,'app','classtype'),(24,'app','deliverymode'),(9,'app','department'),(23,'app','discipline'),(21,'app','faculty'),(10,'app','program'),(20,'app','programtype'),(11,'app','semester'),(12,'app','session'),(13,'app','stafftype'),(14,'app','student'),(15,'app','subject'),(16,'app','teacher'),(17,'app','timetable'),(18,'app','university'),(19,'app','year'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-02-21 05:49:33.108722'),(2,'auth','0001_initial','2026-02-21 05:49:34.376538'),(3,'admin','0001_initial','2026-02-21 05:49:34.637249'),(4,'admin','0002_logentry_remove_auto_add','2026-02-21 05:49:34.648633'),(5,'admin','0003_logentry_add_action_flag_choices','2026-02-21 05:49:34.668677'),(6,'contenttypes','0002_remove_content_type_name','2026-02-21 05:49:34.917125'),(7,'auth','0002_alter_permission_name_max_length','2026-02-21 05:49:35.055288'),(8,'auth','0003_alter_user_email_max_length','2026-02-21 05:49:35.118072'),(9,'auth','0004_alter_user_username_opts','2026-02-21 05:49:35.147043'),(10,'auth','0005_alter_user_last_login_null','2026-02-21 05:49:35.265594'),(11,'auth','0006_require_contenttypes_0002','2026-02-21 05:49:35.270723'),(12,'auth','0007_alter_validators_add_error_messages','2026-02-21 05:49:35.293222'),(13,'auth','0008_alter_user_username_max_length','2026-02-21 05:49:35.414999'),(14,'auth','0009_alter_user_last_name_max_length','2026-02-21 05:49:35.539202'),(15,'auth','0010_alter_group_name_max_length','2026-02-21 05:49:35.596899'),(16,'auth','0011_update_proxy_permissions','2026-02-21 05:49:35.644565'),(17,'auth','0012_alter_user_first_name_max_length','2026-02-21 05:49:35.764766'),(18,'sessions','0001_initial','2026-02-21 05:49:35.831977'),(26,'app','0001_initial','2026-02-22 07:51:35.740976'),(27,'app','0002_biometric','2026-02-22 10:36:01.054619'),(28,'app','0003_remove_biometric_id_alter_biometric_student','2026-02-22 10:43:58.960768');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-22 16:48:54

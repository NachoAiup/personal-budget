-- MySQL dump 10.13  Distrib 5.7.37, for Win32 (AMD64)
--
-- Host: localhost    Database: personal_budget
-- ------------------------------------------------------
-- Server version	5.7.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) NOT NULL,
  `concept` varchar(100) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `category` varchar(30) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2,'income','Sueldo',15000,'2022-09-01',NULL,1),(5,'income','Sueldo',25000,'2022-09-05',NULL,3),(6,'expenditure','Cena en restaurante',1500,'2022-09-01','Comida',1),(7,'income','Cobro por venta',1500,'2022-09-02',NULL,3),(8,'income','Cobro por venta',1500,'2022-09-02',NULL,3),(9,'income','Sueldo',25000,'2022-08-02',NULL,3),(10,'expenditure','Cuota club',500,'2022-08-05','Cuotas',3),(11,'expenditure','Cuota electicidad del hogar',2500,'2022-08-10','Servicios',1),(12,'expenditure','Cuota gas del hogar ',320,'2022-08-10','Servicios',1),(13,'expenditure','Agua del hogar',610,'2022-08-10','Servicios',1),(14,'expenditure','Entradas de cine',850,'2022-08-12','Ocio',1),(16,'income','Sueldo',15000,'2022-08-03',NULL,1),(17,'income','Sueldo',14500,'2022-07-02',NULL,1),(18,'income','Honorarios',4500,'2022-07-12',NULL,1),(19,'income','Cobro por venta',4500,'2022-08-22',NULL,1),(20,'expenditure','Delivery',550,'2022-08-24','Comida',1),(21,'expenditure','Delivery',350,'2022-09-02','Comida',3),(22,'expenditure','Departamento alquiler',1400,'2022-08-07','Alquiler',3),(23,'expenditure','Departamento alquiler',1400,'2022-09-07','Alquiler',3),(24,'expenditure','Pago de impuestos',1040,'2022-08-15','Impuestos',3),(25,'expenditure','Partido de futbol',240,'2022-08-25','Ocio',3);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'example@hotmail.com','$2b$10$oYmEzFs3KhM7j36OWiNMC.8Sh7/R.Y9aPDzXoGkTecVr/L6Lv.qA2','Ignacio Aiup'),(3,'example2@hotmail.com','$2b$10$khZ0URd6qqiZLQ4kY8lQxeshnO3oYrgBOoSpAWebJQPTKGR30p3U6','Example User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-17 17:47:47

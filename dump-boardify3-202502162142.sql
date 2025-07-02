-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: boardify3
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('5c2b73ba-dff5-4adf-8056-141348aaf736','eabf7a8c394c94620c3760af64438135cb736589d5559b9afc67a01c4a029a37','2025-01-01 05:32:27.417','20250101053227_dev',NULL,NULL,'2025-01-01 05:32:27.406',1),('8f3eb246-9f91-461a-99fa-1719e832685a','c336343002245756f419f06af5946233ba89a0119a882fc63e4f9a9c4da1413d','2025-01-01 05:30:57.423','20240921062648_initialization',NULL,NULL,'2025-01-01 05:30:57.284',1),('9c1e7018-b10e-4ced-b071-465245fee8b2','73c92b35c7c36d3bcae8815693e19e02c5205ecb55751dad1cd30cd3281a9c73','2025-01-01 05:30:57.583','20241229064300_',NULL,NULL,'2025-01-01 05:30:57.424',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditlog`
--

DROP TABLE IF EXISTS `auditlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditlog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orgId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action` enum('CREATE','UPDATE','DELETE','SEND') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityType` enum('BOARD','LIST','CARD','MESSAGE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `entityTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userImage` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `userName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditlog`
--

LOCK TABLES `auditlog` WRITE;
/*!40000 ALTER TABLE `auditlog` DISABLE KEYS */;
INSERT INTO `auditlog` VALUES ('20c7890c-e613-4252-9512-8d8fc59d6c55','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Notif satunya','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:29:29.851','2025-01-02 07:29:29.851'),('230dd562-7850-456c-ab2d-2bda4f02fc16','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Gimana','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:24:36.096','2025-01-02 07:24:36.096'),('2882259c-bbb6-4934-b045-ec076f5fba82','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','CEk notif','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:29:04.078','2025-01-02 07:29:04.078'),('2d9790de-76ef-4e41-a734-812705a9c9db','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','d1e20243-95ef-48a7-bec8-f261eb093f5b','LIST','Halo','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-01 23:52:10.391','2025-01-01 23:52:10.391'),('41f09257-a385-4c0e-9e99-d5b852c3b375','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','2 pesan','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:29:13.554','2025-01-02 07:29:13.554'),('6f6defcf-ef66-4f30-b02c-17f33623cb3a','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Berat ini','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 00:44:46.976','2025-01-02 00:44:46.976'),('767f6ee7-ffce-4345-8029-bf76f67a1218','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','CARD','Lakukan','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-01 23:52:16.694','2025-01-01 23:52:16.694'),('78afa8db-7083-49e8-869c-ca85004e03b5','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','UPDATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Iya begitu diubah','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:25:09.484','2025-01-02 07:25:09.484'),('976fa03f-3eb3-4c46-a854-f1764ef7ee71','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','2 pesan','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:29:35.972','2025-01-02 07:29:35.972'),('b1a6034d-96c6-4514-982e-c8d2883c7fbd','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','cb05de28-6ff2-4365-8261-94ea6b713d48','BOARD','Test Akhir','user_2qBnHH1IPa8mHVX6uRp414B74dD','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-01 23:52:03.489','2025-01-01 23:52:03.489'),('c4b5160c-4c0f-465d-84a9-8b2bf122b451','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Ga gimana gimana','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:24:48.568','2025-01-02 07:24:48.568'),('d669200c-fddb-480b-ab75-6e4029311075','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Hooouuoo','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 00:15:40.972','2025-01-02 00:15:40.972'),('ea527ab5-e504-4f22-a237-7d9f4c271c3e','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','CREATE','b009d576-d616-4c39-bc07-4e1f48c2678d','MESSAGE','Halo Guys','user_2phvIQrCwUAdanI99EzPItSjJ5u','https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-01 23:54:38.122','2025-01-01 23:54:38.122');
/*!40000 ALTER TABLE `auditlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orgId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageThumbUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageFullUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUserName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageLinkHTML` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `adminEmail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bagasimam01@gmail.com',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES ('cb05de28-6ff2-4365-8261-94ea6b713d48','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK','Test Akhir','oJueNgDC0vM','https://images.unsplash.com/photo-1694161097603-2858ec0107fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDQzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzU3NzU1MDZ8&ixlib=rb-4.0.3&q=80&w=200','https://images.unsplash.com/photo-1694161097603-2858ec0107fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2NDQzMzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MzU3NzU1MDZ8&ixlib=rb-4.0.3&q=85','Silas Schneider','https://unsplash.com/photos/a-mountain-covered-in-clouds-with-a-sky-background-oJueNgDC0vM','2025-01-01 23:52:03.033','2025-01-01 23:52:03.033','wijaksonobagas18@gmail.com');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL,
  `listId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Card_listId_idx` (`listId`),
  CONSTRAINT `Card_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES ('b009d576-d616-4c39-bc07-4e1f48c2678d','Lakukan',NULL,1,'d1e20243-95ef-48a7-bec8-f261eb093f5b','2025-01-01 23:52:16.313','2025-01-01 23:52:16.313');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `cardId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `File_cardId_idx` (`cardId`),
  CONSTRAINT `File_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `card` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL,
  `boardId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `List_boardId_idx` (`boardId`),
  CONSTRAINT `List_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES ('d1e20243-95ef-48a7-bec8-f261eb093f5b','Halo',1,'cb05de28-6ff2-4365-8261-94ea6b713d48','2025-01-01 23:52:10.002','2025-01-01 23:52:10.002');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `cardId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isReadAdmin` int NOT NULL DEFAULT '0',
  `profileImageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `isSendEmail` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Message_cardId_idx` (`cardId`),
  CONSTRAINT `Message_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `card` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES ('14ce4cc3-80d8-4345-8544-df9e09bfe2f0','user_2phvIQrCwUAdanI99EzPItSjJ5u','Iya begitu diubah','2025-01-02 00:44:46.062','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:25:09.052',1),('32af7e95-8ae3-4994-985c-37def55360b3','user_2phvIQrCwUAdanI99EzPItSjJ5u','CEk notif','2025-01-02 07:29:03.415','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:29:17.820',0),('357816ff-6a47-47f8-b374-fedeba93a352','user_2qBnHH1IPa8mHVX6uRp414B74dD','2 pesan','2025-01-02 07:29:35.291','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:29:35.313',0),('520a8642-a278-428e-88d7-f74d158ab466','user_2phvIQrCwUAdanI99EzPItSjJ5u','Halo Guys','2025-01-01 23:54:36.218','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 00:12:05.701',1),('88436052-6909-4f16-ab93-e9ea96ab3770','user_2phvIQrCwUAdanI99EzPItSjJ5u','2 pesan','2025-01-02 07:29:12.885','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:29:17.820',0),('bd110d5c-ed67-4b75-852a-d50e11845456','user_2qBnHH1IPa8mHVX6uRp414B74dD','Notif satunya','2025-01-02 07:29:29.174','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:29:29.196',0),('c5514f10-8d65-45d5-b869-7bbb0c9bc29f','user_2phvIQrCwUAdanI99EzPItSjJ5u','Ga gimana gimana','2025-01-02 07:24:48.014','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwaHdNZ240N2pNcG0zTklGYWo3SWc4d1pRSiJ9','Bagas imam','2025-01-02 07:25:43.693',0),('cd06c6f3-8bd4-4c59-8ae9-134e91007c7e','user_2qBnHH1IPa8mHVX6uRp414B74dD','Gimana','2025-01-02 07:24:34.759','b009d576-d616-4c39-bc07-4e1f48c2678d',1,'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycUJuSE1iMXNRQnVTTTI3eDdDUzlWQkNJQVAifQ','bagas wijaksono','2025-01-02 07:24:35.662',0);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userReadId` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `messageId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Notifications_messageId_key` (`messageId`),
  KEY `Notifications_messageId_idx` (`messageId`),
  KEY `Notifications_cardId_idx` (`cardId`),
  CONSTRAINT `Notifications_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `card` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Notifications_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `message` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('119ad572-ed0a-43e3-984a-5fde70982af4','user_2phvIQrCwUAdanI99EzPItSjJ5u,user_2qBnHH1IPa8mHVX6uRp414B74dD','c5514f10-8d65-45d5-b869-7bbb0c9bc29f','b009d576-d616-4c39-bc07-4e1f48c2678d'),('3820b8c8-044c-40a9-a55d-1e7cf266f756','user_2qBnHH1IPa8mHVX6uRp414B74dD,user_2phvIQrCwUAdanI99EzPItSjJ5u','cd06c6f3-8bd4-4c59-8ae9-134e91007c7e','b009d576-d616-4c39-bc07-4e1f48c2678d'),('4a747a59-72ff-4ec0-a303-3e3619e4fd13','user_2phvIQrCwUAdanI99EzPItSjJ5u,user_2qBnHH1IPa8mHVX6uRp414B74dD','14ce4cc3-80d8-4345-8544-df9e09bfe2f0','b009d576-d616-4c39-bc07-4e1f48c2678d'),('6f13c669-1ef7-4777-931b-3af4b59592c3','user_2phvIQrCwUAdanI99EzPItSjJ5u,user_2qBnHH1IPa8mHVX6uRp414B74dD','88436052-6909-4f16-ab93-e9ea96ab3770','b009d576-d616-4c39-bc07-4e1f48c2678d'),('929cac93-5599-4078-8a7c-49cb71b54941','user_2qBnHH1IPa8mHVX6uRp414B74dD,user_2phvIQrCwUAdanI99EzPItSjJ5u','357816ff-6a47-47f8-b374-fedeba93a352','b009d576-d616-4c39-bc07-4e1f48c2678d'),('95b9ce94-6bcc-4cfe-85ea-209222387e2e','user_2phvIQrCwUAdanI99EzPItSjJ5u,user_2qBnHH1IPa8mHVX6uRp414B74dD','520a8642-a278-428e-88d7-f74d158ab466','b009d576-d616-4c39-bc07-4e1f48c2678d'),('e0417772-0fa0-433a-87b9-f395046946f8','user_2qBnHH1IPa8mHVX6uRp414B74dD,user_2phvIQrCwUAdanI99EzPItSjJ5u','bd110d5c-ed67-4b75-852a-d50e11845456','b009d576-d616-4c39-bc07-4e1f48c2678d'),('f370e5dc-bded-4b9d-a5c0-cd0e318d8d47','user_2phvIQrCwUAdanI99EzPItSjJ5u,user_2qBnHH1IPa8mHVX6uRp414B74dD','32af7e95-8ae3-4994-985c-37def55360b3','b009d576-d616-4c39-bc07-4e1f48c2678d');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orglimit`
--

DROP TABLE IF EXISTS `orglimit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orglimit` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orgId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrgLimit_orgId_key` (`orgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orglimit`
--

LOCK TABLES `orglimit` WRITE;
/*!40000 ALTER TABLE `orglimit` DISABLE KEYS */;
INSERT INTO `orglimit` VALUES ('48dd159c-23b3-4229-a1b9-6244084b0df0','org_2qBnJXSEmgap5Mo3ikxs4JCOJGK',1,'2025-01-01 23:52:03.091','2025-01-01 23:52:03.091');
/*!40000 ALTER TABLE `orglimit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orgsubscription`
--

DROP TABLE IF EXISTS `orgsubscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orgsubscription` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orgId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_customer_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_subscription_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_price_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_current_period_end` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrgSubscription_orgId_key` (`orgId`),
  UNIQUE KEY `OrgSubscription_stripe_customer_id_key` (`stripe_customer_id`),
  UNIQUE KEY `OrgSubscription_stripe_subscription_id_key` (`stripe_subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgsubscription`
--

LOCK TABLES `orgsubscription` WRITE;
/*!40000 ALTER TABLE `orgsubscription` DISABLE KEYS */;
/*!40000 ALTER TABLE `orgsubscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'boardify3'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-16 21:42:17

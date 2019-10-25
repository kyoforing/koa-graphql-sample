CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `text` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_author_idx` (`author_id`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `authors` VALUES (1,'kyo'),(2,'apple'),(3,'orange');
INSERT INTO `posts` VALUES (1,1,'IOS APP開發工程師','iOS 內容'),(2,2,'物聯網創新應用案例','IOT 內容'),(3,3,'MongoDB快速建構實戰','MongoDB 內容'),(4,3,'Spark MLlib完成資料挖掘與機器學習','Spark MLlib 內容');

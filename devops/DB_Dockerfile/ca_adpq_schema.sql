USE ca;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `contractors`;
DROP TABLE IF EXISTS `contracts`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `images`;

CREATE TABLE `products` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CLIN` varchar(45) DEFAULT NULL,
  `UNSPSC` varchar(45) DEFAULT NULL,
  `ManufacturerPartNumber` varchar(250) NOT NULL,
  `Manufacturer` varchar(255) NOT NULL,
  `SKU` varchar(250) NOT NULL,
  `Title` varchar(250) DEFAULT NULL,
  `Description` text,
  `UnitOfMeasure` varchar(10) DEFAULT NULL,
  `QuantityPerUnitOfMeasure` varchar(20) DEFAULT NULL,
  `ListPrice` decimal(12,4) DEFAULT NULL,
  `ContractPrice` decimal(12,4) DEFAULT NULL,
  `ContractDiscount` varchar(50) DEFAULT NULL,
  `Category` varchar(255) NOT NULL,
  `ProductType` varchar(255) NOT NULL,
  `ContractNumber` varchar(255) NOT NULL,
  `Contractor` varchar(255) DEFAULT NULL,
  `ContractExpiration` datetime DEFAULT NULL,
  `ImageFileName` varchar(250) DEFAULT '',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `contracts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `contractors` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `categories` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `IsActive` bool NOT NULL DEFAULT 1,
  `ProductType` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `TimeZoneOffset` int(11) DEFAULT NULL,
  `IsAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);


INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) 
VALUES ('AuthorizedUser1','AuthorizedU$er1', 0, -4);

INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) 
VALUES ('AuthorizedUser2','AuthorizedU$er2', 0, -4);

INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) 
VALUES ('AuthorizedUser3','AuthorizedU$er3', 0, -4);

INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) 
VALUES ('Admin1','@dMin1', 1, -4);

INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) 
VALUES ('Admin2','@dMin2', 1, -4);


DROP TABLE IF EXISTS `shoppingcart`;

CREATE TABLE `shoppingcart` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `CreateDate`  DATETIME Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `shoppingcartitem`;

CREATE TABLE `shoppingcartitem` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ShoppingCartId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Price` Decimal(12,2) Not NULL,
  `Quantity` int(11) NOT NULL,
  `Description` text NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `CreateDate`  DATETIME Not NULL,
  `PaymentMethod` int(11) NOT NULL,
  `Address1` varchar(250) NOT NULL,
  `Address2` varchar(250) NOT NULL,
  `Address3` varchar(250) NOT NULL,
  `City` varchar(100) NOT NULL,
  `State` varchar(2) NOT NULL,
  `PostalCode` varchar(10) NOT NULL,
  `EmailAddress` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

DROP TABLE IF EXISTS `orderitems`;

CREATE TABLE `orderitems` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Price` Decimal(12,2) Not NULL,
  `Quantity` int(11) NOT NULL,
  `Description` text NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

CREATE TABLE `images` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ImageFileName` varchar(255) NOT NULL,
  `Buffer` mediumblob NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; 

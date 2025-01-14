-- DROP DATABASE IF EXISTS `Project_Freelance_001`;
-- CREATE DATABASE IF NOT EXISTS `Project_Freelance_001`;
-- USE `Project_Freelance_001`;
DROP DATABASE IF EXISTS `bigboysbd`;
CREATE DATABASE IF NOT EXISTS `bigboysbd`;
USE `bigboysbd`;

/*________________________________________________________________________ TODO: Product tables_______________________________________________________________________ */
DROP TABLE IF EXISTS `ShoeType`;
CREATE TABLE IF NOT EXISTS `ShoeType`(
    `ShoeTypeId`    INT UNSIGNED    PRIMARY KEY    AUTO_INCREMENT,
    `ShoeTypeName`  NVARCHAR(255)                        NOT NULL
);

DROP TABLE IF EXISTS `Brand`;
CREATE TABLE IF NOT EXISTS `Brand`(
    `BrandId`       INT UNSIGNED    PRIMARY KEY    AUTO_INCREMENT,
    `BrandName`     NVARCHAR(255)                        NOT NULL,
    `Logo`          NVARCHAR(255)                        NOT NULL
);

DROP TABLE IF EXISTS `Color`;
CREATE TABLE IF NOT EXISTS `Color`(
    `Id`       			INT UNSIGNED    PRIMARY KEY    AUTO_INCREMENT,
    `ColorName`    		NVARCHAR(255)                        NOT NULL
);

DROP TABLE IF EXISTS `Shoe`;
CREATE TABLE IF NOT EXISTS `Shoe`(
    `ShoeId`        INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `ShoeName`      NVARCHAR(255)      NOT NULL,
    `Status`        BOOLEAN            NOT NULL    DEFAULT 0,
    `CreateDate`    DATETIME           NOT NULL    DEFAULT NOW(),
    `Priority`      BOOLEAN            NOT NULL    DEFAULT 0,
    `Description`   TEXT               CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `BrandId`       INT UNSIGNED       NOT NULL,
    `ShoeTypeId`    INT UNSIGNED       NOT NULL,
    FOREIGN KEY (`BrandId`)     REFERENCES `Brand`(`BrandId`),
    FOREIGN KEY (`ShoeTypeId`)  REFERENCES `ShoeType`(`ShoeTypeId`)
);

DROP TABLE IF EXISTS `ShoeImage`;
CREATE TABLE IF NOT EXISTS `ShoeImage`(
    `ShoeImageId`   INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Path`          NVARCHAR(255)      NOT NULL,
    `Priority`      BOOLEAN            NOT NULL    DEFAULT 0,
    `ShoeId`        INT UNSIGNED       NOT NULL,

    FOREIGN KEY (`ShoeId`) REFERENCES `Shoe`(`ShoeId`)
);

DROP TABLE IF EXISTS `ShoeColor`;
CREATE TABLE IF NOT EXISTS `ShoeColor`(
    `ColorId`       	INT UNSIGNED ,
    `ShoeId`    		INT UNSIGNED     ,
    PRIMARY KEY (`ColorId`, `ShoeId`),
	FOREIGN KEY (`ColorId`)     REFERENCES `Color`(`Id`),
	FOREIGN KEY (`ShoeId`)     REFERENCES `Shoe`(`ShoeId`)
);

DROP TABLE IF EXISTS `ShoeSize`;
CREATE TABLE IF NOT EXISTS `ShoeSize`(
    `ShoeId`        INT UNSIGNED,
    `Size`          TINYINT UNSIGNED,
    `Price`         INT UNSIGNED        NOT NULL    DEFAULT 0,
    `Quanlity`      SMALLINT UNSIGNED   NOT NULL    DEFAULT 0,
    `Status`        BOOLEAN             NOT NULL    DEFAULT 1,

    FOREIGN KEY (`ShoeId`) REFERENCES `Shoe`(`ShoeId`),
    PRIMARY KEY (`ShoeId`, `Size`)
);




/*________________________________________________________________________ TODO: Account tables_______________________________________________________________________ */

DROP TABLE IF EXISTS `UserInformation`;
CREATE TABLE IF NOT EXISTS `UserInformation`(
    `Id`            INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Email`         NVARCHAR(255)                   UNIQUE,
    `Address`       NVARCHAR(255),
    `Birthday`      DATE,
    `Fullname`      NVARCHAR(255),
    `Gender`        ENUM("Male", "Female", "Other"),
    `PhoneNumber`   NVARCHAR(20)                  
);


DROP TABLE IF EXISTS `Account`;
CREATE TABLE IF NOT EXISTS `Account`(
    `Id`                INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Password`          NVARCHAR(800)      NOT NULL,
    `CreateAt`          DATETIME           NOT NULL    DEFAULT NOW(),
    `Status`            BOOLEAN            NOT NULL    DEFAULT 1,
    `Active`			BOOLEAN 		   NOT NULL    DEFAULT 0,
    `Role`              ENUM("User", "Admin") NOT NULL    DEFAULT "User",
    `Type`				ENUM("FACEBOOK", "GOOGLE", "WEB", "OTHER")	NOT NULL DEFAULT "WEB",
    `UserInformationId` INT UNSIGNED       NOT NULL,

    FOREIGN KEY (`UserInformationId`) REFERENCES `UserInformation`(`Id`)
);

DROP TABLE IF EXISTS `TokenType`;
CREATE TABLE IF NOT EXISTS `TokenType`(
    `Id`                INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `TokenTypeName`     NVARCHAR(255)      NOT NULL    UNIQUE
);

DROP TABLE IF EXISTS `Token`;
CREATE TABLE IF NOT EXISTS `Token`(
    `Id`            INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Token`         CHAR(36)           NOT NULL    UNIQUE,
    `CreateTime`	DATETIME		   NOT NULL		DEFAULT NOW(),
    `Expiration`    DATETIME           NOT NULL,
    `TokenTypeId`   INT UNSIGNED       NOT NULL,
    `AccountId`     INT UNSIGNED       NOT NULL,
    FOREIGN KEY (`TokenTypeId`) REFERENCES `TokenType`(`Id`),
    FOREIGN KEY (`AccountId`) REFERENCES `Account`(`Id`)
);


/*________________________________________________________________________ TODO: Order tables_______________________________________________________________________ */
DROP TABLE IF EXISTS `CartItem`;
CREATE TABLE IF NOT EXISTS `CartItem` (
    `ShoeId`        INT UNSIGNED       NOT NULL,
    `Size`          TINYINT UNSIGNED   NOT NULL,
    `AccountId`     INT UNSIGNED       NOT NULL,
    `Quantity`      INT UNSIGNED       NOT NULL,
    `UnitPrice`     INT UNSIGNED       NOT NULL,
    `Total`         INT UNSIGNED       NOT NULL,

    PRIMARY KEY (`ShoeId`, `Size`, `AccountId`),
    FOREIGN KEY (`ShoeId`, `Size`)     REFERENCES `ShoeSize`(`ShoeId`, `Size`),
    FOREIGN KEY (`AccountId`)          REFERENCES `Account`(`Id`)
);

DROP TABLE IF EXISTS `Voucher`;
CREATE TABLE IF NOT EXISTS `Voucher` (
    `VoucherId`         INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Title`             NVARCHAR(255)      NOT NULL,
    `Status`            BOOLEAN            NOT NULL    		DEFAULT FALSE,
    `CreateTime`		DATETIME		   NOT NULL	 		DEFAULT NOW(),
    `Code`              VARCHAR(255)       NOT NULL			UNIQUE,
    `ExpirationTime`    DATETIME           NOT NULL,
    `DiscountAmount`    INT UNSIGNED       NOT NULL,
    `Condition`         INT UNSIGNED       NOT NULL,
    `isFreeShip`        BOOLEAN            NOT NULL
);

-- DELETE FROM `OrderDetail`;
-- DELETE FROM `OrderStatus`;
-- DELETE FROM `Voucher`;
-- DELETE FROM `Order`;
-- DELETE FROM `FeedbackImage`;
-- DELETE FROM `Feedback`;


DROP TABLE IF EXISTS `Order`;
CREATE TABLE IF NOT EXISTS `Order` (
    `Id`                CHAR(12)           NOT NULL    PRIMARY KEY,
    `OrderDate`         DATETIME           NOT NULL    DEFAULT NOW(),
    `TotalPrice`        INT UNSIGNED       NOT NULL,
    `SubtotalPrice`     INT UNSIGNED       NOT NULL,
    `Note`              TEXT,
    `Type`              ENUM("Web", "Facebook", "Zalo", "Other") NOT NULL,
	`ShippingFee`       INT UNSIGNED       NOT NULL,
    `UserInformationId` INT UNSIGNED,
    `VoucherId`         INT UNSIGNED,
    FOREIGN KEY (`UserInformationId`) REFERENCES `UserInformation` (`Id`),
    FOREIGN KEY (`VoucherId`) REFERENCES `Voucher` (`VoucherId`)
);

DROP TABLE IF EXISTS `OrderStatus`;
CREATE TABLE IF NOT EXISTS `OrderStatus` (
    `OrderId`       CHAR(12)                                                        NOT NULL,
    `Status`        ENUM("ChoDuyet", "DaDuyet", "DangGiao", "GiaoThanhCong", "Huy") NOT NULL    DEFAULT "ChoDuyet",
    `UpdateTime`    DATETIME                                                        NOT NULL    DEFAULT NOW(),
    PRIMARY KEY (`OrderId`, `Status`),
    FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`)
);

DROP TABLE IF EXISTS `OrderDetail`;
CREATE TABLE IF NOT EXISTS `OrderDetail` (
    `OrderId`       CHAR(12)           NOT NULL,
    `ShoeId`        INT UNSIGNED       NOT NULL,
    `Size`          TINYINT UNSIGNED   NOT NULL,
    `Quantity`      INT UNSIGNED       NOT NULL,
    `UnitPrice`     INT UNSIGNED       NOT NULL,
    `Total`         INT UNSIGNED       NOT NULL,
    FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`),
    FOREIGN KEY (`ShoeId`, `Size`)     REFERENCES `ShoeSize`(`ShoeId`, `Size`),
    PRIMARY KEY (`ShoeId`, `Size`, `OrderId`)
);

/*________________________________________________________________________ TODO: Event Sale _______________________________________________________________________ */

DROP TABLE IF EXISTS `Event`;
CREATE TABLE IF NOT EXISTS `Event` (
  `EventId` 	INT	UNSIGNED	 			PRIMARY KEY AUTO_INCREMENT,
  `Banner` 		VARCHAR(255) 		NOT NULL,
  `EventName` 	varchar(255) 		NOT NULL,
  `StartTime` 	datetime 			NOT NULL,
  `EndTime` 	datetime 			NOT NULL,
  `Status` 		BOOLEAN 			NOT NULL		DEFAULT(false),
  `Percentage` 	TINYINT UNSIGNED 		NOT NULL
);

DROP TABLE IF EXISTS `Sale`;
CREATE TABLE IF NOT EXISTS `Sale` (
	`EventId` INT UNSIGNED NOT NULL,
	`ShoeId`  INT UNSIGNED NOT NULL,
	PRIMARY KEY (`EventId`, `ShoeId`),
	FOREIGN KEY (`EventId`) REFERENCES `Event`(`EventId`),
    FOREIGN KEY (`ShoeId`) REFERENCES `Shoe`(`ShoeId`)

);

/*______________________________________________________________________NEWS_________________________________________________________________________________________ */
DROP TABLE IF EXISTS `News`;
CREATE TABLE IF NOT EXISTS `News` (
    `Id`           INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Banner`       VARCHAR(255)       NOT NULL,
    `Content`      LONGTEXT           NOT NULL,
    `Title`        NVARCHAR(255)      NOT NULL,
    `CreateTime`   DATETIME           NOT NULL    DEFAULT NOW(),
    `Status`       BOOLEAN            NOT NULL    DEFAULT 0,
    `PriorityFlag` BOOLEAN            NOT NULL    DEFAULT 0,
    `AuthorId`	   INT UNSIGNED 	  NOT NULL,
	FOREIGN KEY (`AuthorId`) REFERENCES `Account`(`Id`)
);

DROP TABLE IF EXISTS `NewsImage`;
CREATE TABLE IF NOT EXISTS `NewsImage` (
    `Id`         	INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Path`  		VARCHAR(255)       NOT NULL,
	`NewsId`  		INT UNSIGNED       NOT NULL,
	FOREIGN KEY (`NewsId`) REFERENCES `News`(`Id`)
);

DROP TABLE IF EXISTS `Feedback`;
CREATE TABLE IF NOT EXISTS `Feedback` (
    `Id`           		INT UNSIGNED       	PRIMARY KEY    AUTO_INCREMENT,
	`Title`        		NVARCHAR(255)       NOT NULL,
    `Content`      		TEXT              	NOT NULL,
    `CreateTime`   		DATETIME           	NOT NULL    DEFAULT NOW(),
    `IsDeleted`      	BOOLEAN            NOT NULL    DEFAULT 0,
	`IsChecked`      	BOOLEAN             NOT NULL    	DEFAULT 0,
    `OrderId`	   		CHAR(12)           	NOT NULL,
	FOREIGN KEY (`OrderId`) REFERENCES `Order`(`Id`)
);

DROP TABLE IF EXISTS `FeedbackImage`;
CREATE TABLE IF NOT EXISTS `FeedbackImage` (
    `Id`         		INT UNSIGNED       PRIMARY KEY    AUTO_INCREMENT,
    `Path`  			VARCHAR(255)       NOT NULL,
	`FeedbackId`  		INT UNSIGNED       NOT NULL,
	FOREIGN KEY (`FeedbackId`) REFERENCES `Feedback`(`Id`)
);

/*______________________________________________________________________INVENTORY_________________________________________________________________________________________ */
DROP TABLE IF EXISTS `InventoryReport`;
CREATE TABLE IF NOT EXISTS `InventoryReport` (
    `Id`           	INT UNSIGNED       	PRIMARY KEY    AUTO_INCREMENT,
    `CreateTime`   	DATETIME           	NOT NULL    	DEFAULT NOW(),
    `Supplier` 		NVARCHAR(255)									,
    `SupplierPhone`	NVARCHAR(100)									,
    `TotalPrice`	INT UNSIGNED		NOT NULL
);

DROP TABLE IF EXISTS `InventoryReportStatus`;
CREATE TABLE IF NOT EXISTS `InventoryReportStatus` (
    `InventoryReportId`           	INT UNSIGNED                            NOT NULL,
    `Status`        				ENUM("ChoNhapKho", "DaNhapKho",  "Huy") NOT NULL    DEFAULT "ChoNhapKho",
    `UpdateTime`    				DATETIME                                NOT NULL    DEFAULT NOW(),
    PRIMARY KEY (`InventoryReportId`, `Status`),
    FOREIGN KEY (`InventoryReportId`) REFERENCES `InventoryReport`(`Id`)
);

DROP TABLE IF EXISTS `InventoryReportDetail`;
CREATE TABLE IF NOT EXISTS `InventoryReportDetail` (
    `InventoryReportId`       	INT UNSIGNED       NOT NULL,
    `ShoeId`        			INT UNSIGNED       NOT NULL,
    `Size`          			TINYINT UNSIGNED   NOT NULL,
    `Quantity`      			INT UNSIGNED       NOT NULL,
    `UnitPrice`     			INT UNSIGNED       NOT NULL,
    `Total`         			INT UNSIGNED       NOT NULL,
    FOREIGN KEY (`InventoryReportId`) REFERENCES `InventoryReport`(`Id`),
    FOREIGN KEY (`ShoeId`, `Size`)     REFERENCES `ShoeSize`(`ShoeId`, `Size`),
    PRIMARY KEY (`ShoeId`, `Size`, `InventoryReportId`)
);

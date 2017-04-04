
CREATE TABLE IF NOT EXISTS `Locations` (
  `location_id` int(10) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(150) ,
  `latitude` float(10,6),
  `longitude` float(10,6),
  CONSTRAINT PK_LocationId PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_general_ci;

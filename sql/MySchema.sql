CREATE TABLE IF NOT EXISTS area (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS type (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS zone (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) UNIQUE,
    area_id INT NOT NULL,
    INDEX(area_id)
    CONSTRAINT FK_zone_areaId FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS track (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    date DATE,
    length FLOAT,
    description VARCHAR(255),
    year INT,
    zone_id INT NOT NULL,
    CONSTRAINT FK_track_zoneId FOREIGN KEY (zone_id) REFERENCES zone (id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS geometry (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    coordinates_lat FLOAT,
    coordinates_long FLOAT,
    coordinates_height FLOAT,
    type_id INT NOT NULL,
    CONSTRAINT FK_geometry_typeId FOREIGN KEY (type_id) REFERENCES type (id) ON DELETE CASCADE,
    track_id INT,
    CONSTRAINT FK_geometry_trackId FOREIGN KEY (track_id) REFERENCES track (id) ON DELETE CASCADE
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS zone_fence (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    coordinates_lat FLOAT,
    coordinates_long FLOAT,
    coordinates_height FLOAT,
    type_id INT NOT NULL,
    CONSTRAINT FK_fence_typeId FOREIGN KEY (type_id) REFERENCES type (id) ON DELETE CASCADE,
    zone_id INT,
    CONSTRAINT FK_fence_zoneId FOREIGN KEY (zone_id) REFERENCES zone (id) ON DELETE CASCADE
)ENGINE=InnoDB;


CREATE TABLE IF NOT EXISTS area (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(255)
);

CREATE TABLE IF NOT EXISTS zone (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(255) UNIQUE,
    area_id INTEGER NOT NULL,
    FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS type (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(255)
);

CREATE TABLE IF NOT EXISTS track (
    id SERIAL PRIMARY KEY NOT NULL,
    name CHARACTER VARYING(255) NOT NULL,
    date DATE,
    length FLOAT,
    description CHARACTER VARYING(255),
    year INTEGER,
    zone_id INTEGER NOT NULL,
    FOREIGN KEY (zone_id) REFERENCES zone (id)
);

CREATE TABLE IF NOT EXISTS geometry (
    id SERIAL PRIMARY KEY NOT NULL,
    coordinates_lat FLOAT,
    coordinates_long FLOAT,
    coordinates_height FLOAT,
    type_id INTEGER NOT NULL,
    FOREIGN KEY (type_id) REFERENCES type (id),
    track_id INTEGER,
    FOREIGN KEY (track_id) REFERENCES track (id)
);

CREATE TABLE IF NOT EXISTS zone_fence (
    id SERIAL PRIMARY KEY NOT NULL,
    coordinates_lat FLOAT,
    coordinates_long FLOAT,
    coordinates_height FLOAT,
    type_id INTEGER NOT NULL,
    FOREIGN KEY (type_id) REFERENCES type (id),
    zone_id INTEGER,
    FOREIGN KEY (zone_id) REFERENCES zone (id)
);


INSERT INTO area(name) VALUES ('Friðland að Fjallabaki');

INSERT INTO type(name) VALUES ('Polygon');
INSERT INTO type(name) VALUES ('Polyline');
INSERT INTO type(name) VALUES ('Point');




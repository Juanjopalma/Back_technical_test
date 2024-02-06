CREATE DATABASE countries;

USE countries;

CREATE TABLE country (
	country_id INT UNSIGNED PRIMARY KEY,
    common_name VARCHAR(50) NOT NULL UNIQUE,
    population INT UNSIGNED NOT NULL
);

select * from country;

delete FROM country;

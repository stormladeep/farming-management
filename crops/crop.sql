CREATE DATABASE farming_management;

USE farming_management;

CREATE TABLE crops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crop_name VARCHAR(255) NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    seeds INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    image_path VARCHAR(255),
    notes TEXT
);

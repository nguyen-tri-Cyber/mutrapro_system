USE mutrapro_auth;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE roles(
  id INT AUTO_INCREMENT PRIMARY KEY,
  code ENUM('customer','coordinator','transcriber','arranger','artist','studio_admin','admin') UNIQUE
);
CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('customer','coordinator','transcriber','arranger','artist','studio_admin','admin') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO roles(code) VALUES
('customer'),('coordinator'),('transcriber'),('arranger'),('artist'),('studio_admin'),('admin');

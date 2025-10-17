USE mutrapro_studio;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS studios;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE studios(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255),
  status ENUM('available','booked','maintenance') DEFAULT 'available'
);
CREATE TABLE booking(
  id INT AUTO_INCREMENT PRIMARY KEY,
  studio_id INT NOT NULL,
  artist_id INT NOT NULL,
  order_id INT,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled'
);
INSERT INTO studios(name, location, status) VALUES
('Room A','1st Floor','available'),
('Room B','2nd Floor','available');

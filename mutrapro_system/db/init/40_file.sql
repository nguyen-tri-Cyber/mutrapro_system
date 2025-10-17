USE mutrapro_file;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS files;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE files(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  uploader_id INT,
  file_name VARCHAR(255),
  file_path VARCHAR(255),
  file_type ENUM('audio','notation','mix','final'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

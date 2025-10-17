USE mutrapro_order;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS orders;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE orders(
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  service_type ENUM('transcription','arrangement','recording') NOT NULL,
  description TEXT,
  status ENUM('pending','assigned','in_progress','completed','paid','cancelled') NOT NULL DEFAULT 'pending',
  price DECIMAL(10,2) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL
);
CREATE TABLE payment(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  customer_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  method ENUM('credit_card','paypal','bank_transfer') NOT NULL,
  status ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE feedback(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  rating INT,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

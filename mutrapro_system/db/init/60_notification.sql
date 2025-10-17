USE mutrapro_notification;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS notifications;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE notifications(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  channel ENUM('system','email') DEFAULT 'system',
  status ENUM('pending','sent','failed') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

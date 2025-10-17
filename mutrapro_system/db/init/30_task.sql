USE mutrapro_task;
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS task;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE task(
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  assigned_to INT NOT NULL,
  specialist_role ENUM('transcriber','arranger','artist') NOT NULL,
  status ENUM('assigned','in_progress','done') NOT NULL DEFAULT 'assigned',
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deadline DATETIME NULL
);

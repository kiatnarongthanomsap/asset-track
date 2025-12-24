-- Import History Table
CREATE TABLE IF NOT EXISTS import_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    imported_by VARCHAR(100),
    total_rows INT DEFAULT 0,
    success_rows INT DEFAULT 0,
    failed_rows INT DEFAULT 0,
    error_log TEXT,
    import_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Import Details Table (เก็บรายละเอียดแต่ละแถว)
CREATE TABLE IF NOT EXISTS import_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    import_id INT,
    row_number INT,
    status ENUM('success', 'failed', 'skipped') DEFAULT 'success',
    asset_code VARCHAR(50),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (import_id) REFERENCES import_history(id) ON DELETE CASCADE
) ENGINE=InnoDB;

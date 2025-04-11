CREATE TABLE IF NOT EXISTS Users (
    UserID SERIAL PRIMARY KEY,
    Email TEXT NOT NULL UNIQUE,
    Phone TEXT,
    Address TEXT
);

CREATE TABLE IF NOT EXISTS user_audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    field TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    admin_id INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO Users (Email, Phone, Address) VALUES
('ValodVarchapet@gmail.com', '+37477112233', 'Bagramyan 26'),
('VzgoNxagah@gmail.com', '+37411777777', 'Vazgen Sargsyan 1')



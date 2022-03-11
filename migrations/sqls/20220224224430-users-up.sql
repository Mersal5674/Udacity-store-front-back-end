CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password TEXT NOT NULL
    );
ALTER TABLE users ALTER COLUMN password TYPE text;
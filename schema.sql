CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    target VARCHAR(30),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password TEXT
);


CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    target VARCHAR(30)
)

INSERT INTO items(title,target) VALUES('Learn NodeJS','Today')('Be a backend Developer', 'Tomorrow');
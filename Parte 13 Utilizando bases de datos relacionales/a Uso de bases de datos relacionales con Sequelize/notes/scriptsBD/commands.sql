

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);
INSERT INTO blogs (author, url, title, likes) VALUES ('Autor 1', 'http://url1.com', 'Título 1', 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('Autor 2', 'http://url2.com', 'Título 2', 0);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    important BOOLEAN DEFAULT FALSE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creation_year INTEGER
);


INSERT INTO notes (content, important, creation_year)
VALUES ('Esta es la primera nota', TRUE, 2025);

INSERT INTO notes (content, important, creation_year)
VALUES ('Esta es la segunda nota', FALSE, 2025);

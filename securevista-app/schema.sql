CREATE TABLE notices (
  id INTEGER PRIMARY KEY,
  user TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tag TEXT
);

INSERT INTO notices (id, user, title, body, tag) VALUES (1, 'admin', 'Welcome to SecureVista', 'This is a welcome message for the SecureVista application.', 'welcome');
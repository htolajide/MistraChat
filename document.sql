CREATE TABLE
  handbook_doc (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    CONTENT TEXT,
    embedding vector (1024)
  );
CREATE TABLE IF NOT EXISTS cities (
    slug character varying(30) NOT NULL UNIQUE,
    countries_slug character varying(30) NOT NULL REFERENCES countries(slug) ON DELETE CASCADE
);
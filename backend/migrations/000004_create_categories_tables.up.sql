BEGIN;
CREATE TABLE IF NOT EXISTS categories_parentcategories (
    image character varying(200) NOT NULL,
    is_active boolean NOT NULL,
    priority integer NOT NULL,
    slug character varying(50) PRIMARY KEY,
    icon_image text
);
CREATE TABLE IF NOT EXISTS categories_childcategories (
    slug character varying(50) PRIMARY KEY,
    parent_id character varying(50) NOT NULL REFERENCES categories_parentcategories(slug) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    icon_image text
);
COMMIT;
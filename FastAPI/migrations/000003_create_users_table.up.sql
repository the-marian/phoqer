BEGIN;
CREATE TABLE IF NOT EXISTS users_user (
    id SERIAL PRIMARY KEY,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    bio text NOT NULL,
    birth_date date,
    email character varying(254) NOT NULL UNIQUE,
    profile_img character varying(200),
    country character varying(30) REFERENCES countries(slug) ON DELETE CASCADE,
    city character varying(30) REFERENCES cities(slug) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS users_userdislike (
    id SERIAL PRIMARY KEY,
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    user_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS users_userlike (
    id SERIAL PRIMARY KEY,
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    user_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS users_descriptionrating (
    id SERIAL PRIMARY KEY,
    mark smallint NOT NULL CHECK (mark >= 0),
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    user_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS users_communicationrating (
    id SERIAL PRIMARY KEY,
    mark smallint NOT NULL CHECK (mark >= 0),
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    user_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
COMMIT;
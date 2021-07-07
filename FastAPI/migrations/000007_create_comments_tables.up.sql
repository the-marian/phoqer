BEGIN;
CREATE TABLE IF NOT EXISTS comments_comment (
    id SERIAL PRIMARY KEY,
    body text NOT NULL,
    pub_date date NOT NULL,
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    offer_id uuid NOT NULL REFERENCES offers_offer(id) ON DELETE CASCADE REFERENCES offers_offer(id) DEFERRABLE INITIALLY DEFERRED,
    replies_id integer REFERENCES comments_comment(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS comments_like (
    id SERIAL PRIMARY KEY,
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    comment_id integer NOT NULL REFERENCES comments_comment(id) ON DELETE CASCADE REFERENCES comments_comment(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS comments_dislike (
    id SERIAL PRIMARY KEY,
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    comment_id integer NOT NULL REFERENCES comments_comment(id) ON DELETE CASCADE REFERENCES comments_comment(id) DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS comments_commentimage (
    id SERIAL PRIMARY KEY,
    name character varying(50) NOT NULL,
    url character varying(200) NOT NULL,
    comment_id integer NOT NULL REFERENCES comments_comment(id) ON DELETE CASCADE REFERENCES comments_comment(id) DEFERRABLE INITIALLY DEFERRED
);
COMMIT;
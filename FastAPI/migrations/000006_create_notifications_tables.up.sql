BEGIN;
CREATE TABLE IF NOT EXISTS notifications_notification (
    id SERIAL PRIMARY KEY,
    body text NOT NULL,
    pub_date timestamp with time zone NOT NULL,
    viewed boolean NOT NULL,
    recipient_id integer NOT NULL REFERENCES users_user(id) DEFERRABLE INITIALLY DEFERRED
);
COMMIT;
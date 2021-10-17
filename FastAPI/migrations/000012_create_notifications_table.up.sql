CREATE TABLE notifications (
id SERIAL PRIMARY KEY,
notification_type VARCHAR NOT NULL,
body VARCHAR NOT NULL,
offer_id UUID REFERENCES offers_offer(id) ON DELETE CASCADE,
pub_date timestamp with time zone,
recipient_id INT REFERENCES users_user(id) ON DELETE CASCADE,
viewed BOOLEAN NOT NULL
)
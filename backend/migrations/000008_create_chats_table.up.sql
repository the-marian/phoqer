CREATE TABLE IF NOT EXISTS chats (
    chat_id SERIAL PRIMARY KEY,
    author_id integer REFERENCES users_user(id) ON DELETE CASCADE,
    client_id integer REFERENCES users_user(id) ON DELETE CASCADE,
    offer_id uuid REFERENCES offers_offer(id) ON DELETE CASCADE,
    creation_datetime timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_done boolean DEFAULT false
);
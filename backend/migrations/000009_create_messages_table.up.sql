CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text text,
    chat_id integer REFERENCES chats(chat_id) ON DELETE CASCADE,
    author_id integer REFERENCES users_user(id) ON DELETE CASCADE,
    creation_datetime timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_red boolean DEFAULT false
);
CREATE TABLE IF NOT EXISTS messages_uploads (
    access_url character varying(200),
    message_id integer REFERENCES messages(id) ON DELETE CASCADE,
    chat_id integer REFERENCES chats(chat_id) ON DELETE CASCADE
);
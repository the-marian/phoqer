CREATE TABLE IF NOT EXISTS offers_offer (
    city character varying(50) REFERENCES cities(slug) ON DELETE CASCADE,
    cover_image character varying(200),
    currency character varying(3),
    deposit_val integer CHECK (deposit_val >= 0),
    description text,
    doc_needed boolean,
    extra_requirements text,
    id uuid PRIMARY KEY,
    is_deliverable boolean,
    price integer CHECK (price >= 0),
    promote_til_date date,
    pub_date date NOT NULL,
    status character varying(8) NOT NULL,
    title character varying(120),
    views integer NOT NULL CHECK (views >= 0),
    author_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    category_id character varying(50) REFERENCES categories_parentcategories(slug) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    sub_category_id character varying(50) REFERENCES categories_childcategories(slug) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    max_rent_period smallint CHECK (max_rent_period >= 0),
    min_rent_period smallint CHECK (min_rent_period >= 0),
    country character varying(30) REFERENCES countries(slug) ON DELETE CASCADE,
    items_amount smallint,
    rental_period character varying(6)
);
CREATE TABLE IF NOT EXISTS offers_offer_favorite (
    id SERIAL PRIMARY KEY,
    offer_id uuid NOT NULL REFERENCES offers_offer(id) ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES users_user(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT offers_offer_favourite_offer_id_user_id_4fc892f0_uniq UNIQUE (offer_id, user_id)
);
CREATE TABLE IF NOT EXISTS offers_offerimages (
    id SERIAL PRIMARY KEY,
    name character varying(50) NOT NULL,
    url character varying(200) NOT NULL,
    offer_id uuid NOT NULL REFERENCES offers_offer(id) ON DELETE CASCADE REFERENCES offers_offer(id) DEFERRABLE INITIALLY DEFERRED
);


CREATE TABLE "public"."user" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "display_id" text NOT NULL, "display_name" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("display_id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."user" rename to "users";


CREATE TABLE "public"."articles" ("subject" text NOT NULL, "content" text NOT NULL, "author_id" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "published_at" timestamptz, PRIMARY KEY ("id") , FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_articles_updated_at"
BEFORE UPDATE ON "public"."articles"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_articles_updated_at" ON "public"."articles" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."articles" drop constraint "articles_author_id_fkey";

DROP table "public"."users";

CREATE TABLE "public"."users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "display_id" text NOT NULL, "display_name" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("display_id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."articles"
  add constraint "articles_author_id_fkey"
  foreign key ("author_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;

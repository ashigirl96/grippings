

alter table "public"."articles" drop constraint "articles_author_id_fkey";

DROP TABLE "public"."users";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."users";

alter table "public"."articles"
  add constraint "articles_author_id_fkey"
  foreign key ("author_id")
  references "public"."users"
  ("id") on update restrict on delete restrict;

DROP TABLE "public"."articles";

alter table "public"."users" rename to "user";

DROP TABLE "public"."user";

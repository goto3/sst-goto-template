CREATE TABLE IF NOT EXISTS "todos" (
	"id" integer PRIMARY KEY NOT NULL,
	"text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question_categories" (
	"question_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT question_categories_category_id_question_id PRIMARY KEY("category_id","question_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_categories" ADD CONSTRAINT "question_categories_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "question_categories" ADD CONSTRAINT "question_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

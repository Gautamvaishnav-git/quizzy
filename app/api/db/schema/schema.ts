import { InferModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// const userRole = pgEnum("role", ["admin", "user"]);
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userName: text("user_name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  // role: userRole("role").default("user"),
});

export const insertUserSchema = createInsertSchema(users);
export type IInsertUser = z.infer<typeof insertUserSchema>;

export type IUser = InferModel<typeof users>;

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  option1: text("option_1"),
  option2: text("option_2"),
  option3: text("option_3"),
  option4: text("option_4"),
  answer: text("answer"),
  question: text("question"),
  description: text("description"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

/**
 *  user profile table
 */
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 256 }),
});

export const categoriesRelation = relations(categories, ({ one, many }) => ({
  questions: many(questionsOnCategory),
}));

export const questionsOnCategory = pgTable(
  "question_categories",
  {
    questionId: integer("question_id")
      .notNull()
      .references(() => questions.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey(t.categoryId, t.questionId),
  })
);

export const questionsOnCategoryRelation = relations(questionsOnCategory, ({ one }) => ({
  question: one(questions, { fields: [questionsOnCategory.questionId], references: [questions.id] }),
  category: one(categories, { fields: [questionsOnCategory.categoryId], references: [categories.id] }),
}));

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  questions: many(questions),
}));

export const quizRelations = relations(questions, ({ one, many }) => ({
  user: one(users, {
    fields: [questions.userId],
    references: [users.id],
  }),
  questionCategories: many(questionsOnCategory),
}));

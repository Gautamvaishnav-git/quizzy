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

export const UserSchema = createInsertSchema(users, {
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters!" }),
  userName: z.string().min(3, { message: "Username must be at least 3 characters!" }),
});
export type IUser = z.infer<typeof UserSchema>;

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

export const quizSchema = createInsertSchema(questions, {
  question: z.string(z.number()).min(1, { message: "Enter question!" }),
  option1: z.string(z.number()).min(1),
  option2: z.string(z.number()).min(1),
  option3: z.string(z.number()).min(1),
  option4: z.string(z.number()).min(1),
  id: z.number().optional(),
  answer: z.string(z.number({ required_error: "Answer is required!" })),
  description: z.string().optional(),
}).refine(
  (values) => {
    switch (values.answer) {
      case values.option1:
        return true;
      case values.option2:
        return true;
      case values.option3:
        return true;
      case values.option4:
        return true;
      default:
        return false;
    }
  },
  {
    message: "Choose correct answer!",
    path: ["answer"],
  }
);

export type IQuiz = z.infer<typeof quizSchema>;

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

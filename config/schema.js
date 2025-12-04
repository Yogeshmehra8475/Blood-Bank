import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userdata = pgTable("user_data", {
  id: serial("id").primaryKey(),
  name: varchar("Username").notNull(),
  usermail: varchar("Usermail").notNull().unique(),
  birthdate: varchar("DOB").notNull(),
  bloodgroup: varchar("Bloodgroup").notNull(),
  mobile: varchar("Mobile").notNull().unique(),
  country: varchar("Country").notNull(),
  state: varchar("State").notNull(),
  city: varchar("City").notNull(),
  age: integer("Age").notNull(),
});

export const bloodBankData = pgTable("blood_bank", {
  BloodBankId: serial("BBid").primaryKey(),
  name: varchar("Name").notNull(),
  country: varchar("BBCountry").notNull(),
  state: varchar("BBState").notNull(),
  city: varchar("BBCity").notNull(),
  bloodGroups: varchar("BloodGroups").notNull(),
  address: varchar("Address").notNull(),
  telephoneNumber: varchar("Telephone").notNull().unique(),
});

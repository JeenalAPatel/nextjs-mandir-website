import {boolean, date, pgTable, serial, timestamp, varchar} from "drizzle-orm/pg-core";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    firstname: varchar("firstname", { length: 255 }).notNull(),
    lastname: varchar("lastname", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    cellphone: varchar("cellphone", { length: 255 }).notNull(),
    region: varchar("region", { length: 255 }).notNull(),
    center: varchar("center", { length: 255 }).notNull(),
    ageGroup: varchar("ageGroup", { length: 255 }).notNull(),
    registrationDate: timestamp("created_at").notNull().defaultNow(),

    status: varchar("status", { length: 255 }).notNull(),
});

export const slots=pgTable("slots",{
    id:serial("id").primaryKey(),
    slotName:varchar("slotName",{length:255}).notNull(),
    region:varchar("region",{length:255}).notNull(),
    wing:varchar("wing",{length:255}).notNull().default("Female"),
    mandal:varchar("mandal",{length:255}).notNull(),
    capacity:varchar("capacity",{length:255}).notNull(),
    slotType:varchar("slotType",{length:255}).notNull().default("Regular"),
    startDate:date("startDate").notNull(),
    endDate:date("endDate").notNull(),
    notes:varchar("notes",{length:255}),
    active:boolean("active").notNull().default(true),

})
export type User = typeof users.$inferSelect;
export type Slot=typeof slots.$inferSelect;
export type CreateSlot=typeof slots.$inferInsert;
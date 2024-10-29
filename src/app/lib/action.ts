"use server";
import {z} from 'zod';

import {db} from '../../db';
import {CreateSlot, slots, users} from "@/db/schema";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const formSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    cellphone: z.string(),
    region: z.string(),
    center: z.string(),
    ageGroup: z.string(),
    status: z.string()

})
const slotSchema = z.object({
    slotName: z.string(),
    region: z.string(),
    wing: z.string(),
    mandal: z.string(),
    capacity: z.string(),
    slotType: z.string(),
    // startDate should only include the current date or future dates in the format of YYYY-MM-DD
    startDate: z.date().min(new Date(new Date().toISOString().split('T')[0]), {message: "start date should be today or future date"}),
    endDate: z.string(),
    notes: z.string(),
    active: z.boolean()

})

export async function insertUserData(formData: FormData) {
    const validatedFields = formSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "missing fields, failed to create user",
        }
    }
    const {firstname, lastname, email, cellphone, region, center, ageGroup, status} = validatedFields.data;
    // @ts-ignore
    await db.insert(users).values({
        firstname: firstname,
        lastname: lastname,
        email: email,
        cellphone: cellphone,
        region: region,
        center: center,
        ageGroup: ageGroup,
        status: status
    })
    revalidatePath("/")
    redirect("/");
}

export async function insertSlotData(data:CreateSlot){
    await db.insert(slots).values(data);
    revalidatePath('/slot');
}
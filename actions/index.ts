"use server";

import { db } from "@/lib/db";
import { users } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

//Create a New User
export const createUser = async (
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData,
) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    console.log("Values:", { name, email }); // ← check terminal output

    const user = await db.insert(users).values({
      name,
      email,
    });

    revalidatePath("/");
    return { success: true, message: "User created!" };
  } catch (error) {
    console.error("DB Error:", error); // ← log the real error
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error creating a user",
    };
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await db.select().from(users);
    console.log(allUsers);

    return allUsers || [];
  } catch (error) {
    console.error("getAllUsers error:", error); // ✅ see what's actually failing
    return []; // ✅ always return an array, never undefined
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(id)));
    revalidatePath("/");
    return user;
  } catch (error) {}
};

export const updateUser = async (id: string, formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    // const isActive = formData.get("isActive") === "on";

    await db
      .update(users)
      .set({ name, email, updatedAt: new Date() })
      .where(eq(users.id, parseInt(id)));
    revalidatePath("/");
    return {
      success: true,
      message: "User updated successfully!",
    };
  } catch (error) {}
};

export const deleteUser = async (
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const id = parseInt(formData.get("id") as string); // ✅ get id from hidden input

    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/");
    return { success: true, message: "User deleted!" };
  } catch (error) {
    return { success: false, message: "Failed to delete user" };
  }
};

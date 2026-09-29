"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { writeClient } from "@/sanity/lib/write-client";

const MAX_LENGTHS = {
  name: 200,
  email: 320,
  organization: 200,
  service: 200,
  message: 5000,
};

export async function submitContactForm(formData: {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
}) {
  try {
    const name = String(formData.name ?? "").trim();
    const email = String(formData.email ?? "").trim();
    const organization = String(formData.organization ?? "").trim();
    const service = String(formData.service ?? "").trim();
    const message = String(formData.message ?? "").trim();

    // Validate inputs
    if (!name) {
      return { success: false, error: "Name is required." };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "A valid email is required." };
    }
    if (!service) {
      return { success: false, error: "Please select a service." };
    }
    if (!message) {
      return { success: false, error: "Message is required." };
    }
    if (
      name.length > MAX_LENGTHS.name ||
      email.length > MAX_LENGTHS.email ||
      organization.length > MAX_LENGTHS.organization ||
      service.length > MAX_LENGTHS.service ||
      message.length > MAX_LENGTHS.message
    ) {
      return { success: false, error: "One or more fields are too long." };
    }

    // The `inquiries.` id prefix keeps these documents private on public datasets.
    await writeClient.create({
      _id: `inquiries.${crypto.randomUUID()}`,
      _type: "inquiry",
      name,
      email,
      organization,
      service,
      message,
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    revalidatePath("/admin");
    revalidatePath("/admin/inquiries");

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Something went wrong on our end. Please try again." };
  }
}

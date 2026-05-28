"use strict";
"use server";

import fs from "fs/promises";
import path from "path";

export interface ContactSubmission {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
  timestamp: string;
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
}) {
  try {
    // Validate inputs
    if (!formData.name || !formData.name.trim()) {
      return { success: false, error: "Name is required." };
    }
    if (!formData.email || !formData.email.trim() || !formData.email.includes("@")) {
      return { success: false, error: "A valid email is required." };
    }
    if (!formData.service || formData.service === "") {
      return { success: false, error: "Please select a service." };
    }
    if (!formData.message || !formData.message.trim()) {
      return { success: false, error: "Message is required." };
    }

    const submission: ContactSubmission = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Store in a local json file for audit/persistence
    const filePath = path.join(process.cwd(), "submissions.json");
    let currentSubmissions: ContactSubmission[] = [];
    
    try {
      const data = await fs.readFile(filePath, "utf-8");
      currentSubmissions = JSON.parse(data);
    } catch (e) {
      // file might not exist yet, that's fine
    }

    currentSubmissions.push(submission);
    await fs.writeFile(filePath, JSON.stringify(currentSubmissions, null, 2), "utf-8");

    console.log("New contact form submission received:", submission);

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return { success: false, error: "Something went wrong on our end. Please try again." };
  }
}

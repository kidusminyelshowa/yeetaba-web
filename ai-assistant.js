import OpenAI from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

async function getCodeSupport(prompt) {
  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.3-70b-instruct",
    messages: [
      { 
        role: "system", 
        content: "You are an expert Senior Web Developer. Provide clean, modular, and modern code." 
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.2, // Lower temperature is better for coding accuracy
    max_tokens: 2048,
  });

  console.log(completion.choices[0].message.content);
}

getCodeSupport("Write a responsive CSS Grid layout for a landing page hero section.");
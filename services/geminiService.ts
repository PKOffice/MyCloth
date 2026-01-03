import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a luxury marketing hook for a given product.
 * Used to enhance the product detail experience.
 */
export async function getProductInsights(product: Product) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a copywriter for a high-end bespoke atelier called MyCloth. 
      Provide a sophisticated, one-sentence marketing hook for this product: ${product.name}. 
      Category: ${product.category}. 
      Context: ${product.description}. 
      Focus on bespoke tailoring, timeless personal expression, and architectural refinement.`,
    });
    return response.text?.trim() || "A bespoke foundation for the discerning individual.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Refined for the modern archive, ensuring pure comfort and bespoke poise.";
  }
}

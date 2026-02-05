
import { GoogleGenAI, Type } from "@google/genai";
import { Paper } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async summarizePaper(paper: Paper): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Please provide a concise, high-level summary of the following scientific paper for a researcher. Explain the core innovation and potential impact.
        
        Title: ${paper.title}
        Abstract: ${paper.abstract}
        Category: ${paper.mainCategory} (${paper.subCategory})
        Authors: ${paper.authors.join(', ')}`,
        config: {
          temperature: 0.7,
        },
      });

      return response.text || "Could not generate summary at this time.";
    } catch (error) {
      console.error("Gemini summarization failed:", error);
      return "An error occurred while trying to summarize this paper using AI.";
    }
  }

  async recommendTopics(currentTopics: string[]): Promise<string[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Based on these trending research topics: ${currentTopics.join(', ')}, suggest 3 additional emerging research categories in ArXiv notation (e.g., cs.LG, hep-ph).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            }
          }
        }
      });

      const text = response.text || "[]";
      return JSON.parse(text);
    } catch (error) {
      console.error("Gemini recommendation failed:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();

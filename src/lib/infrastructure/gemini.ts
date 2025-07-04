import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateSummary(description: string, title: string): Promise<string> {
    try {
      const prompt = this.buildPrompt(description, title);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      console.log(response);
      return response.text().trim();
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error("Failed to generate summary");
    }
  }

  private buildPrompt(description: string, title: string): string {
    return `
  You are a smart, very polite acquaintance who was listening to "${title}" and someone asked you "what was it about?"

  Here's the episode info:
  ${description}

  Give the real substance - what did they actually talk about? What were the main points, insights, or stories? tell me what I'd actually learn or find interesting.

  Write like you're texting an acquaintance. Be conversational. If it was boring, say so. If it had insights, highlight them.

  Keep it 3-4 sentences max, keep the response, respecful and lighthearted.
  
 Start with  "This was" when refering to episodes no "Hey", no greeting`;
  }
}

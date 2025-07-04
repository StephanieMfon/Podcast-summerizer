import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY!
    );
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
You are an expert podcast summarizer. Create a concise, engaging summary of this podcast episode.

Episode Title: ${title}
Episode Description: ${description}

Instructions:
- Create a 3-4 sentence summary that captures the main points
- Focus on key insights, actionable takeaways, and interesting concepts
- Write in an engaging, professional tone
- Avoid repeating the title verbatim
- Make it valuable for someone deciding whether to listen

Summary:`;
  }
}

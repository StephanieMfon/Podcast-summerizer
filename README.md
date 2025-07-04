# Podcast Summarizer

Podcast Summarizer is a Next.js/TypeScript web app that lets users discover, search, and summarize podcast episodes using AI LLM.

## Features

- 🔍 Search and filter podcasts by genre and keyword
- 📝 AI-powered episode summaries (Gemini API)
- 🎧 Browse and paginate podcast episodes (Listen Notes API)
- ⚡ Fast, responsive UI with reusable components
- 🛡️ Robust error handling and clean architecture

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Listen Notes API
- Gemini AI API
- MongoDB (optional, for persistence)

## Project Structure

```
src/
  app/
  components/
  hooks/
  lib/
  types/
  data/
public/
```

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   - Copy `.env.local.sample` to `.env.local` and fill in your API keys.

3. **Run the development server:**

   ```sh
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `npm run dev` – Start the dev server
- `npm run lint` – Lint code with ESLint

## Environment Variables

See `.env.local.sample` for required variables:

- `MONGODB_URI`
- `GOOGLE_AI_API_KEY`
- `LISTEN_NOTES_API_KEY`
- `NEXT_PUBLIC_APP_URL`

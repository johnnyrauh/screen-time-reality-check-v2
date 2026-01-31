# Screen Time Reality Check

A personalized screen time analysis tool that gives you an honest reality check about your phone usage. Upload your screen time screenshot and get AI-powered insights with gamified results.

## Features

- **Screenshot Analysis**: Upload iOS/Android screen time screenshots for automatic data extraction using Claude Vision
- **Personalized Questionnaire**: 8-step flow to understand your goals and relationship with your phone
- **AI-Powered Insights**: Claude analyzes your data to generate personalized "gut punches" and actionable plans
- **Gamified Results**: Impact leaderboard, severity scores, opportunity timeline, and tiered action plans
- **Beautiful UI**: Glassmorphism design with animations and responsive layout

## Privacy & Security

**Your data is completely private.** We take privacy seriously:

- **No Data Storage**: We don't store any data in databases
- **Immediate Deletion**: Screenshots are processed in memory and immediately discarded - never saved to disk
- **Ephemeral Results**: Your analysis results are shown once and not saved anywhere
- **No User Accounts**: No registration, no login, no user tracking
- **No Analytics**: No Google Analytics, no tracking pixels, no cookies
- **Open Source**: The code is fully transparent - see exactly how your data is handled

Your screenshot goes directly to Claude's API for analysis, the extracted data is used to generate your results, and then everything is discarded. Nothing persists.

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Deployed on Vercel

**Backend:**
- Node.js + Express + TypeScript
- Anthropic Claude API (Vision + Text)
- Deployed on Railway

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/johnnyrauh/screen-time-reality-check-v2.git
cd screen-time-reality-check-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## Environment Variables

### Backend (Railway)
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `NODE_ENV`: `production`

### Frontend (Vercel)
- `VITE_API_URL`: URL of the deployed backend

## License

MIT

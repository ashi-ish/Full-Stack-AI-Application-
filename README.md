
# AI Chat App with Next.js & OpenAI

This project is a modern AI-powered chat application built with Next.js and the OpenAI API. It features both standard and streaming chat modes, a beautiful UI, and easy extensibility.

## Features
- Next.js 14 App Router
- OpenAI API integration (chat & streaming)
- Modern, responsive UI
- Environment variable support for API keys
- Error handling and loading states

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ashi-ish/Full-Stack-AI-Application-.git
cd Full-Stack-AI-Application-/aiappnextjs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your OpenAI API key
Create a `.env.local` file in the `aiappnextjs` folder:
```
OPENAI_API_KEY=sk-...your-key-here...
```

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Enter a message in the chat box and click "Chat" for a standard response.
- Click "Stream Chat" for a streaming response from OpenAI.
- Both responses are displayed in a modern card layout.

## Project Structure
- `aiappnextjs/app/page.js` — Main chat UI and logic
- `aiappnextjs/app/api/chat/route.ts` — Standard chat API route
- `aiappnextjs/app/api/chat-stream/route.js` — Streaming chat API route
- `aiappnextjs/app/page.module.css` — Custom styles

## Customization
- You can easily change the UI, add avatars, or extend with more features.
- Update the OpenAI model in the API routes as needed.

## License
MIT

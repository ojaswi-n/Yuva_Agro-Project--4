# Yuva Agro

Agricultural web platform for Indian farmers — water and fertilizer calculators,
AI crop disease detection, and a bilingual (English/Hindi) farmer chatbot.

## Stack

- Frontend: static HTML, CSS, vanilla JavaScript
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- AI: Google Gemini 2.5 Flash (vision + chat)

## Architecture

The Express server serves BOTH the API and the frontend pages on one port.
This means the browser and API share an origin, so pages call `/api/...`
directly with no CORS problems.

```
Browser  ──>  Express (port 5000)  ──>  MongoDB      (farmer records)
                                   └─>  Gemini API   (disease + chat)
```

Request flow follows: routes -> controllers -> models

## Setup

1. Install dependencies:

   ```
   cd backend
   npm install
   ```

2. Create `backend/.env` (copy from `.env.example`):

   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/yuva_agro
   GEMINI_API_KEY=your_actual_key_here
   ```

   Get a free Gemini key at https://aistudio.google.com/apikey

3. Make sure MongoDB is running locally.

4. Start the server:

   ```
   npm start
   ```

5. Open http://localhost:5000

## API

| Method | Endpoint               | Purpose                          |
|--------|------------------------|----------------------------------|
| GET    | `/api/health`          | Server / DB / AI status          |
| GET    | `/api/farmers`         | List all farmers                 |
| GET    | `/api/farmers/:id`     | Get one farmer                   |
| POST   | `/api/farmers`         | Register a farmer                |
| POST   | `/api/disease/detect`  | Analyse crop image (multipart)   |
| POST   | `/api/chat`            | Farmer chatbot (en / hi)         |

## Notes

- API keys live only in `backend/.env` and are never sent to the browser.
- If MongoDB is down the server still starts, so the AI features keep working;
  farmer endpoints return a clear 503 instead.

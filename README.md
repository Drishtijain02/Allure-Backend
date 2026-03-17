# Allure Salon — Backend API

Node.js + Express + MongoDB REST API for managing salon appointments.

---

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Create your .env (copy the example and fill in your MongoDB URI)
cp .env.example .env          # Linux/Mac
copy .env.example .env         # Windows

# 3. Start the server
npm start
```

The server starts on **http://localhost:5000** by default.

---

## Environment Variables

| Variable          | Description                                              | Example                                              |
| ----------------- | -------------------------------------------------------- | ---------------------------------------------------- |
| `MONGO_URI`       | MongoDB connection string (Atlas or local)               | `mongodb+srv://user:pass@cluster.mongodb.net/allure` |
| `PORT`            | Port the server listens on (default `5000`)              | `5000`                                               |
| `ALLOWED_ORIGINS` | Comma-separated list of origins allowed by CORS          | `https://my-app.netlify.app,http://localhost:3000`   |

---

## API Endpoints

| Method   | Path                       | Description                   |
| -------- | -------------------------- | ----------------------------- |
| `GET`    | `/api/health`              | Health check + DB status      |
| `GET`    | `/api/appointments`        | List all (newest first)       |
| `GET`    | `/api/appointments?status=New` | Filter by status          |
| `GET`    | `/api/appointments?date=2026-03-17` | Filter by date       |
| `POST`   | `/api/appointments`        | Create new appointment        |
| `PATCH`  | `/api/appointments/:id`    | Update appointment status     |
| `DELETE` | `/api/appointments/:id`    | Delete an appointment         |

### POST body example

```json
{
  "id": "abc123",
  "name": "Priya Sharma",
  "phone": "9876543210",
  "service": "Haircut",
  "date": "2026-03-20",
  "time": "14:00",
  "msg": "First visit"
}
```

### PATCH body example

```json
{ "status": "Confirmed" }
```

Allowed status values: `New`, `Confirmed`, `Done`, `Cancelled`

---

## Deploy on Render

1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your GitHub repo.
4. Settings:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
5. Add environment variables in the Render dashboard:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `ALLOWED_ORIGINS` — your Netlify URL, e.g. `https://allure-salon.netlify.app`
6. Deploy. Your API will be live at: `https://your-service.onrender.com`

### Final API URL format

```
https://your-service.onrender.com/api/appointments
```

Use this URL in your frontend's `API_URL` constant.

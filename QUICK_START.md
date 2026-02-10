# Quick Start Guide

## 1. Clone/Setup (Already Done ✅)

You already have the project at `d:/own`

## 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Go back to root
cd ..
```

## 3. Configure Environment Variables

### Backend (`server/.env`)
Copy `server/.env.example` to `server/.env` and fill in:

**Required:**
- `MONGO_URI` - Get from MongoDB Atlas (free tier)
- `JWT_SECRET` - Any random string (e.g., "mySecretKey123")
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail App Password (see SETUP.md)

**Optional:**
- Cloudinary keys (for image uploads)
- Stripe keys (for payments)

### Frontend (`client/.env`)
Create `client/.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 4. Run the Application

```bash
# From root directory
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 5. Create Admin User

1. Open http://localhost:5173
2. Register a new account
3. Open MongoDB (Atlas or Compass)
4. Find your user in the `users` collection
5. Change `role` from `"user"` to `"admin"`

## 6. Test Features

- ✅ Browse vehicles at `/vehicles`
- ✅ Book a vehicle (requires login)
- ✅ Chat with owners at `/chat`
- ✅ View dashboard at `/dashboard`
- ✅ Access admin panel at `/admin` (admin only)

## Need More Details?

See `SETUP.md` for complete documentation.

# RideX Setup Guide

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Google Maps API Key**
- **Gmail Account** (for email notifications)

---

## 1. Environment Variables

### Backend (.env in `/server`)

Create a `.env` file in the `server` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Nodemailer - Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Stripe (optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (.env in `/client`)

Create a `.env` file in the `client` directory:

```env
# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 2. Getting API Keys

### MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (replace `<password>` with your database password)
4. Example: `mongodb+srv://username:password@cluster.mongodb.net/ridex?retryWrites=true&w=majority`

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create credentials → API Key
5. Copy the API key

### Gmail App Password (for email notifications)
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (use this as `EMAIL_PASS`)

### Cloudinary (for image uploads)
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Get your Cloud Name, API Key, and API Secret from the dashboard

### Stripe (optional - for payments)
1. Go to [Stripe](https://stripe.com/)
2. Create an account
3. Get your test API keys from the dashboard

---

## 3. Installation

### Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

## 4. Running the Application

### Option 1: Run Both (Recommended)

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## 5. Initial Setup

### Create Admin User

After starting the server, you can create an admin user by:

1. Register a new user through the frontend
2. Manually update the user's role in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "your_email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

Or use MongoDB Compass/Atlas UI to change the role to `admin`.

---

## 6. Project Structure

```
d:/own/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── hooks/       # Custom hooks
│   ├── .env             # Frontend environment variables
│   └── package.json
│
├── server/              # Node.js backend
│   ├── controllers/     # Route logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Helper functions
│   ├── .env             # Backend environment variables
│   └── server.js        # Entry point
│
└── package.json         # Root scripts
```

---

## 7. Testing the Application

### Test User Flows

1. **Register/Login**: Create a user account
2. **Browse Vehicles**: View available vehicles
3. **Book a Vehicle**: Select dates and location
4. **Chat**: Message vehicle owners
5. **Reviews**: Leave reviews after completing bookings
6. **Admin Panel**: Access `/admin` with admin account

### API Endpoints

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Vehicles: `GET /api/vehicles`, `POST /api/vehicles`
- Bookings: `POST /api/bookings`, `GET /api/bookings/mybookings`
- Reviews: `POST /api/reviews`, `GET /api/reviews/:vehicleId`
- Admin: `GET /api/admin/analytics`, `GET /api/admin/users`

---

## 8. Common Issues

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### MongoDB Connection Error
- Check your `MONGO_URI` is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database user credentials

### Email Not Sending
- Verify Gmail App Password is correct
- Check that 2-Step Verification is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are set

### Google Maps Not Loading
- Verify API key is correct
- Check that required APIs are enabled
- Ensure billing is enabled (Google requires it even for free tier)

---

## 9. Production Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Environment Variables
- Set `NODE_ENV=production`
- Use production MongoDB cluster
- Use production API keys
- Configure CORS for your domain

### Hosting Options
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Database**: MongoDB Atlas

---

## 10. Features Implemented

✅ User Authentication (JWT)
✅ Vehicle Listings & Management
✅ Booking System with Availability Check
✅ Real-time Chat (Socket.io)
✅ Review & Rating System
✅ Email Notifications (Nodemailer)
✅ Google Maps Location Picker
✅ Admin Dashboard with Analytics
✅ User Role Management
✅ Review Moderation

---

## Need Help?

Check the logs:
- Backend: Terminal running `npm run dev` in `/server`
- Frontend: Browser console (F12)
- MongoDB: Check connection in MongoDB Atlas/Compass

For more details, see the implementation plan and task list in the `.gemini/antigravity/brain/` directory.

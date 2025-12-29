# Bitrix12 Setup Guide

## Quick Start

### 1. Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign in with: `dec99343@gmail.com`
   - Create a new cluster (Free tier M0 is fine)
   - Go to "Network Access" → Add IP Address → Allow access from anywhere (0.0.0.0/0)
   - Go to "Database Access" → Create a database user (remember the password!)
   - Click "Connect" → "Connect your application"
   - Copy the connection string

4. **Create `.env` file in `server/` folder:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/bitrix12?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_here
   ```
   Replace:
   - `your_username` with your MongoDB username
   - `your_password` with your MongoDB password
   - `cluster0.xxxxx` with your actual cluster address

5. **Start the backend server:**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Create `.env` file in root directory:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

### 3. Usage

1. Open your browser to `http://localhost:5173` (or the port Vite shows)
2. Click "Get Started" button
3. Register with your email and password (or login if already registered)
4. Your tasks will now be stored in MongoDB!

## Important Notes

- Make sure the backend server is running before using the frontend
- Tasks are now stored in MongoDB, not localStorage
- Each user has their own tasks (authenticated by email/password)
- The JWT token is stored in localStorage for session management

## Troubleshooting

- **Connection Error**: Make sure MongoDB Atlas allows your IP address
- **401 Unauthorized**: Check if your token is valid, try logging in again
- **Server not starting**: Check if MongoDB connection string is correct in `.env`


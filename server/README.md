# Bitrix12 Backend Server

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in with your account (dec99343@gmail.com)
2. Create a new cluster (free tier is fine)
3. Click "Connect" → "Connect your application"
4. Copy the connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`)
5. Replace `<password>` with your MongoDB password
6. Replace `<dbname>` with `bitrix12` (or any name you prefer)

### 3. Create Environment File

Create a `.env` file in the `server` folder:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_secret_key_here_any_random_string
```

Example:
```
PORT=5000
MONGODB_URI=mongodb+srv://dec99343:yourpassword@cluster0.xxxxx.mongodb.net/bitrix12?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 5. Update Frontend Environment

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Requires Authentication)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/toggle` - Toggle task status
- `DELETE /api/tasks/:id` - Delete task

## Notes

- Make sure MongoDB Atlas allows connections from your IP (or 0.0.0.0/0 for all IPs in Network Access)
- The server uses JWT tokens for authentication
- Tokens expire after 7 days


# Authentication System

## 🚀 Features

- **User Authentication**
  - Registration with email verification
  - Login with JWT tokens
  - Password reset functionality
  - Protected routes

## 💻 Tech Stack

- Next.js 13
- TypeScript
- MongoDB
- Tailwind CSS
- JWT & Bcrypt
- Nodemailer

## 🛠️ Installation

```bash
## Clone repository
git clone https://github.com/Kaya-Khurana/Authentication_System.git

# Install dependencies
npm install

# Create .env file
MONGO_URI=your_mongodb_uri
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000

# Run development server
npm run dev

## 🔐 API Routes

- POST `/api/users/signup`
- POST `/api/users/login`
- POST `/api/users/forgotpassword`
- POST `/api/users/resetpassword`
- GET `/api/users/verifyemail`

## 🔄 Authentication Flow

1. **Registration & Verification**
2. **Login & JWT**
3. **Password Reset**

## 🛡️ Security Features

- Bcrypt password hashing
- JWT authentication
- Email verification
- Secure password reset

## 🧪 Testing

```bash
npm run test
```

## 📝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 👤 Author
**Kaya Khurana**
- GitHub: [@Kaya-Khurana](https://github.com/Kaya-Khurana)


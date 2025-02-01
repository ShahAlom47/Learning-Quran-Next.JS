// src/
//  ├── app/
//  │   ├── layout.js
//  │   ├── page.js
//  │   ├── about/
//  │   │   ├── page.js
//  
//  │
//  ├── api/         # ✅ Next.js API Routes (server functions)
//  │   ├── auth/
//  │   │   ├── login.js      # Login API (POST)
//  │   │   ├── register.js   # Register API (POST)
//  │   │   ├── logout.js     # Logout API (GET)
//  │   ├── user/
//  │   │   ├── profile.js    # Get user profile API (GET)
//  │   │   ├── update.js     # Update user info (PUT)
//  │
//  ├── lib/         # ✅ Server-side utilities & DB config
//  │   ├── db.js         # Database connection (MongoDB, PostgreSQL, etc.)
//  │   ├── auth.js       # Authentication utilities (JWT, bcrypt)
//  │   ├── fetch.js      # API calling functions
//  │
//  ├── middleware/   # ✅ Custom Middleware (optional)
//  │   ├── authMiddleware.js
//  │
//  ├── components/
//  │   ├── Navbar.jsx
//  │
//  ├── hooks/
//  │   ├── useAuth.js
//  │
//  ├── styles/
//  │   ├── globals.css
//  │
//  ├── utils/
//  │   ├── formatDate.js
//  │   ├── validateInput.js
//  │
//  ├── config/
//  │   ├── env.js         # Environment variables
//  │   ├── apiConfig.js   # API base URLs

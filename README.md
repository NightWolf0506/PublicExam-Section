# **This project uses:**



- ✅ **Prisma** for database schema and migrations  
- 🔐 **Clerk** for authentication (admin sign-in)  
- 🐳 **Docker** for containerized development  
- ⚙️ **.env configuration** for secure secrets and keys

---

## ⚙️ **Environment Setup**

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create `.env` file** from the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Add your **Clerk keys** and other required environment variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   DATABASE_URL=your-database-url
   PORT=3000
   ```

---

## 🧩 **Prisma Setup**

1. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

2. **Run migrations to set up your database schema:**

   ```bash
   npx prisma migrate dev --name init
   ```

3. (Optional) View the Prisma Studio (GUI):

   ```bash
   npx prisma studio
   ```

---

## 🔐 **Clerk Authentication**

- This project uses **Clerk** for user login.
- The **sign-in page** is available at:

  ```
  http://localhost:3000/sign-in
  ```

- Use your **pre-existing Clerk admin credentials** to log in and test.

---

## 🐳 **Make sure you db is runing on the port 5432 preferably use docker-desktop to run your db**



Ensure the exposed port matches the one in your `.env` (`PORT=3000` or as set in the `Dockerfile`).

---

## 🧪 **Run Development Server**

For local development:

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

Sign in using your Clerk admin ID at `/sign-in`.
based on role you will have availiable options in nav to interact with (admin,teacher,student,parents) make sure sure required roles are created in clerk base, either do it manually on clerk website or sign-in to app from admin account and sue form to create users of respective role.

---

## 📜 **License**

This project is licensed under the MIT License.

# Admin Access Setup Guide

## How to Set Yourself as Admin

Follow these steps to grant admin access to your Clerk account:

### Step 1: Get Your Clerk User ID

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:4321/get-user-id`

3. Sign in with your Clerk account

4. Copy your User ID from the page

### Step 2: Add Your User ID to .env

1. Open `/frontend/.env` file

2. Find the line `ADMIN_USER_IDS=`

3. Paste your User ID after the equals sign:
   ```env
   ADMIN_USER_IDS=user_2xxxxxxxxxxxxxxxxxxxxx
   ```

### Step 3: Restart Your Server

1. Stop your dev server (Ctrl+C)

2. Start it again:
   ```bash
   npm run dev
   ```

### Step 4: Test Admin Access

Visit `http://localhost:4321/admin` - you should now have access!

---

## Adding Multiple Admins

To allow multiple users to access the admin dashboard, separate their User IDs with commas:

```env
ADMIN_USER_IDS=user_2abc123,user_2def456,user_2ghi789
```

---

## How It Works

- **Middleware Protection**: The `/admin` route checks if the signed-in user's ID is in the `ADMIN_USER_IDS` list
- **Unauthorized Users**: Non-admin users are redirected to `/unauthorized` page
- **Unauthenticated Users**: Users who aren't signed in are redirected to the Clerk sign-in page

---

## Security Notes

- Never commit your `.env` file to version control
- User IDs are safe to use for authorization
- Keep your admin user list private
- Regularly review who has admin access

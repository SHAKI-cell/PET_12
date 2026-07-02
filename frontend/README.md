# DoFo Pet Marketplace – Frontend Configuration & Setup

This repository contains the Next.js/React frontend application for the DoFo Pet Marketplace. Follow the instructions below to configure the environment and run the application locally.

---

## 🛠️ Environment Configuration

To run the application, you need to configure your environment variables. 

### Step 1: Create a `.env.local` File
Copy the example environment template to create your local environment file:
```bash
cp .env.example .env.local
```

### Step 2: Configure variables in `.env.local`
Your `.env.local` file should look like this (do NOT commit this file to git):
```env
# Google Gemini API Key (Server-side, keep secret)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Firebase Client Configuration (Public, used for authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN_HERE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID_HERE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET_HERE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID_HERE
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_FIREBASE_MEASUREMENT_ID_HERE
```

---

## 🔑 How to Obtain API Keys

### 1. Google Gemini API Key
To connect the DoFo AI Assistant to the live Gemini models:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google Account.
3. Click on **Get API Key** in the top navigation panel.
4. Click **Create API Key** -> Choose a Google Cloud Project (or create a new one).
5. Copy the generated key (starts with `AIzaSy...`) and paste it as `GEMINI_API_KEY` in your `.env.local` file.
6. **Security Recommendation**: Restrict your key usage only to the Generative Language API in your Google Cloud Console.

### 2. Firebase Credentials
To configure Firebase authentication and syncing:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create or select your project.
3. Go to **Project Settings** (gear icon) -> **General**.
4. Scroll down to **Your apps** -> select your Web App (or add a new web app).
5. Copy the config properties from the `firebaseConfig` object and paste them into their corresponding `NEXT_PUBLIC_FIREBASE_` environment variables in your `.env.local` file.

---

## 🚀 Running the Project Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Secret Scanning & Repository History Clean Up

If a secret (such as a Gemini API Key) was accidentally pushed to GitHub, follow these instructions to clean up the repository history:

### Option 1: Using BFG Repo-Cleaner (Recommended)
1. Download BFG Repo-Cleaner from [rtyley.github.io/bfg-repo-cleaner](https://rtyley.github.io/bfg-repo-cleaner/).
2. Run the cleaner to replace all instances of the key with a placeholder text:
   ```bash
   bfg --replace-text passwords.txt
   ```
   *(Create a `passwords.txt` file containing the exact API key to replace before running).*
3. Force push the cleaned branch to GitHub:
   ```bash
   git push origin --force --all
   ```

### Option 2: Using `git-filter-repo`
1. Install `git-filter-repo` via pip or package manager:
   ```bash
   pip install git-filter-repo
   ```
2. Run filter-repo to scrub instances of your secret key:
   ```bash
   git filter-repo --replace-text <(echo "YOUR_EXPOSED_API_KEY ==> PLACEHOLDER")
   ```
3. Re-add your remote origin and push:
   ```bash
   git remote add origin https://github.com/SHAKI-cell/PET_12.git
   git push origin --force --all
   ```

# HakVersity

HakVersity — part of the Hakeela ecosystem.

## Admissions submissions

The admissions form stores applications in MongoDB Atlas through the Vercel API function at `/api/applications`.

1. Copy `.env.example` to `.env.local` and add your MongoDB Atlas connection string.
2. Use `MONGODB_DB=hakversity` unless you want a different database name.
3. Add `MONGODB_URI` and `MONGODB_DB` to the Vercel project environment variables for Preview and Production.
4. Deploy from the repository root so `vercel.json` installs both the frontend and API dependencies.

The MongoDB URI is server-only and must never use a `VITE_` prefix or be placed in frontend source code.

This branch was initialized empty; site work starts here.

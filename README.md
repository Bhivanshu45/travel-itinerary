# Travel Itinerary App

A full-stack web application for planning, sharing, and viewing travel itineraries. Built with Node.js, Express, Prisma, PostgreSQL, and Next.js.

## Features

### Core Features

- **Trip Creation:** Create a trip with name, destination city, start/end dates, and a list of activities (with optional time).
- **Itinerary View:** See your trip in a day-by-day format, grouped by city stops and activities.
- **Persistence:** All trips are stored in a database (PostgreSQL). Supports create, list, and view operations.
- **Frontend:** Modern UI built with Next.js. Pages for home (public trips), create trip, view itinerary, and user-specific trips.
- **Privacy:** Trips can be public or private. Only public trips are shown on the home page.
- **Shareable Links:** Generate a unique link for each trip to share with friends (view-only).

### Bonus Features

- **Destination Images:** Each trip displays a destination image fetched from Unsplash.

## Tech Stack

- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL(NeonDB)
- **Frontend:** Next.js (React)
- **Images:** Unsplash API

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (or SQLite for local testing)

### 1. Clone the Repository

```
git clone https://github.com/your-username/travel-itinerary.git
cd travel-itinerary
```

### 2. Install Dependencies

```
cd backend
npm install
cd ../travel-frontend
npm install
```

### 3. Configure Environment Variables

#### Backend (`backend/.env`)

```
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

#### Frontend (`travel-frontend/.env.local`)

```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 4. Set Up the Database

```
cd backend
npx prisma migrate dev --name init
```

### 5. Start the Backend Server

```
cd backend
npm start
```

### 6. Start the Frontend

```
cd travel-frontend
npm run dev
```

### 7. Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)

## Usage

- **Home Page:** View all public trips.
- **Create Trip:** Add a new trip with city stops and activities.
- **My Trips:** Enter your phone number to view your trips.
- **Itinerary View:** See trip details, grouped by day and city.
- **Shareable Link:** Copy and share the trip link for view-only access.

## Deployment

- Frontend: Deployed to Vercel.
- Backend: Deployed to Render.

## Demo

- Loom video demo: <demo_link>

## License

MIT

---

**Made with ❤️ for travel planning!**

# Travel Itinerary App

A full-stack web application for planning, sharing, and viewing travel itineraries. Built with Node.js, Express, Prisma, PostgreSQL/SQLite, and Next.js.

## Features

### Core Features

- **Trip Creation:** Create a trip with name, destination city, start/end dates, and a list of activities (with optional time).
- **Itinerary View:** See your trip in a day-by-day timeline format, grouped by city stops and activities.
- **Persistence:** All trips are stored in a database (PostgreSQL/SQLite). Supports create, list, and view operations.
- **Frontend:** Modern, responsive UI built with Next.js and Tailwind CSS. Pages for home (public trips), create trip, view itinerary, and user-specific trips.
- **Privacy:** Trips can be public or private. Only public trips are shown on the home page.
- **Shareable Links:** Generate a unique link for each trip to share with friends (view-only).

### Add-on Features

- **Destination Images:** Each trip displays a destination image fetched from Unsplash.
- **Weather Forecast:** Daily weather for each city stop using OpenWeather API, shown in the itinerary timeline.
- **Error Handling:** Graceful loading and error states for all external APIs.
- **Responsive & Accessible:** Mobile-friendly, keyboard navigation, and color contrast for accessibility.
- **Polished UI:** Skeleton loaders, animated timeline, and dark mode toggle (optional).

## Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL/SQLite
- **Images:** Unsplash API
- **Weather:** OpenWeather API

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (or SQLite for local testing)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/travel-itinerary.git
cd travel-itinerary
```

### 2. Install Dependencies

```bash
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
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 4. Set Up the Database

```bash
cd backend
npx prisma migrate dev --name init
```

### 5. Start the Backend Server

```bash
cd backend
npm start
```

### 6. Start the Frontend

```bash
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
- **Itinerary View:** See trip details, grouped by day and city, with weather and images.
- **Shareable Link:** Copy and share the trip link for view-only access.

## Screenshots

_Add screenshots of trip creation, itinerary view, weather integration, and sharing._

## Demo

- Loom video demo: <demo_link>

---

## What Makes This App Stand Out?

- **Modern UI/UX:** Responsive, animated timeline, skeleton loaders, and optional dark mode.
- **Bonus Features:** Weather, images, shareable links, error handling.
- **Clean Code:** Feature-based structure, reusable components, and maintainable logic.
- **Scalable:** Easy to extend with new features (collaborators, calendar export, etc).

---

## Deployment

- Frontend: Deployed to Vercel.
- Backend: Deployed to Render.

## Demo

- Loom video demo: <demo_link>

## License

MIT

---

**Made with ❤️ for travel planning!**

---

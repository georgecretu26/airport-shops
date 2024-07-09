# Airport Shopping and Dining Management Application

## Project Overview

The Airport Shopping and Dining Management Application is a web-based platform that allows users to view and manage various shops and dining facilities within an airport. The application provides two main sections: Shopping and Dining. Users can view detailed information about each facility, search for facilities, and administrators can manage the facilities and reset the database to its initial state.

## Features

### User Features

1. View Shops and Dining Options: Users can browse a list of shops and dining facilities.
2. Search Functionality: Users can search for facilities by title or description.
3. View Facility Details: Users can view detailed information about a specific shop or dining facility, including opening hours, location, and contact details.

### Admin Features

1. CRUD Operations: Admins can create, read, update, and delete facilities.
2. Role-Based Access: Admins have full access to the system, while managers can update details of their assigned shops.
3. Database Reset: Admins can reset the database to its initial state.

## Technologies Used

#### Frontend:

- React with TypeScript
- Next.js
- TanStack Query (React Query)
- Tailwind CSS

#### Backend:

- .NET 8 Web API
- Entity Framework Core
- SQLite (for development)

### Installation and Setup

### Prerequisites

- Node.js
- .NET 8 SDK

### Installing pnpm

If you do not have pnpm installed, you can install it globally using npm:

```
npm install -g pnpm
```

### Frontend Setup

1. Clone the repository:

```
git clone https://github.com/georgecretu26/airport-shops.git
cd airport-management
```

2. Install dependencies:

```
pnpm install
```

Start the frontend development server:

```
pnpm dev
```

### Backend Setup

Navigate to the backend directory:

```
cd apps/backend
```

Install dependencies:

```
dotnet restore
```

Run the application:

```
dotnet run
```

### Seeding the Database

The database is automatically seeded with initial data when the application is first run. This includes roles, users, and facilities.

#### Running the Application

- Frontend: The frontend development server will run on http://localhost:3000.
- Backend: The backend server will run on http://localhost:5051.

## How to Use the Application

1. Open http://localhost:3000 in your browser.
2. Browse through the list of shops and dining facilities.
3. Use the search bar to find specific facilities.
4. Admin users can log in to access admin features such as managing facilities and resetting the database.

## API Endpoints

- GET /api/facilities: Get all facilities.
- POST /api/facilities: Create a new facility (Admin only).
- PUT /api/facilities/{id}: Update a facility (Admin/Manager).
- DELETE /api/facilities/{id}: Delete a facility (Admin only).
- POST /api/facilities/reset: Reset the database to initial seed (Admin only).

## Challenges

- Backend Deployment: There were challenges in deploying the backend to a production environment. Local development works seamlessly with SQLite, but deployment configurations for databases like PostgreSQL or MySQL in production environments need additional setup.
- State Management: Ensuring state synchronization between the frontend and backend, especially with concurrent updates, required careful handling using TanStack Query.
- Role-Based Access Control: Implementing precise role-based access control to ensure that managers can only update their assigned shops was crucial.

## Future Improvements

- Backend Deployment: Configure and test backend deployment using cloud services like AWS or Azure.
- Enhanced Security: Implement JWT authentication for secure API access.
- Scalability: Optimize the application for scalability, considering cloud-based database solutions.
- User Interface: Improve the user interface and experience with more detailed facility information and better design.

## Conclusion

This project provides a comprehensive platform for managing airport shops and dining facilities, with features tailored for both users and administrators. While local development is straightforward, further work is needed to ensure seamless deployment and scalability in production environments.

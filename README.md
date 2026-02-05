# Care Nexus

A comprehensive healthcare management application built with Next.js, Tailwind CSS, and Shadcn UI.

## Recent Updates

### 1. Doctor Portal & Authentication
- **Dedicated Doctor Signup**: Created a specific registration flow for doctors at `/doctor/signup`.
  - Captures extended details: Department, Qualifications, Hospital Name.
  - Automatically links doctor profiles to the global doctor directory.
- **Doctor Dashboard**: Implemented a dashboard for doctors at `/doctor/dashboard`.
  - Redirects doctors to this dashboard upon login instead of the generic Admin page.
- **Role-Based Redirection**: Improved authentication logic to correctly route Patients to `/dashboard`, Doctors to `/doctor/dashboard`, and Admins to `/admin`.

### 2. Global State Management (Admin & Client Sync)
- **Synchronized Data**: The Admin Dashboard (`/admin`) is now the single source of truth for doctor data.
  - **Adding Doctors**: Doctors added by Admin or self-registered via `/doctor/signup` are instantly visible to all users.
  - **Deleting Doctors**: Deleting a doctor from the Admin panel removes them globally (from user lists and patient views) and revokes their login access.
- **Persistence**: Doctor data is now persisted in `localStorage` ('doctors' key), ensuring data survives page reloads and is shared between `AuthContext` (Login/Signup) and `AppContext` (Admin/Patient views).

## Features

- **Patient Portal**: Book appointments, view past reports, manage profile.
- **Doctor Portal**: Manage schedule, view assigned patients (Stubbed).
- **Admin Dashboard**: Manage doctors, medicines, and system settings.
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Access the App**:
    -   Home: [http://localhost:3000](http://localhost:3000)
    -   Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
    -   Doctor Login: [http://localhost:3000/doctor/login](http://localhost:3000/doctor/login)

## Tech Stack
-   Next.js 15 (App Router)
-   TypeScript
-   Tailwind CSS
-   Shadcn UI
-   Lucide React Icons

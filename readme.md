# EduTech Learning Platform

A modern educational platform built with Next.js, TypeScript, and Tailwind CSS, featuring role-based dashboards for students, instructors, and administrators.

## 🚀 Features

- **Role-Based Access**: Separate dashboards for students, instructors, and administrators
- **Modern UI**: Clean and intuitive interface inspired by Linear.app and Pixelbin.io
- **Responsive Design**: Fully responsive layout for all devices
- **Dark Mode Support**: Built-in dark mode with system preference detection
- **Real-time Updates**: Live updates for course progress and notifications

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn
- PostgreSQL database
- Supabase account (for authentication and database)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd edutech-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="your-database-url"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Dashboard Access

### Student Dashboard
- URL: `http://localhost:3000/dashboard`
- Features:
  - View enrolled courses
  - Track learning progress
  - Access course materials
  - View assignments and grades

### Instructor Dashboard
- URL: `http://localhost:3000/instructor/dashboard`
- Features:
  - Manage courses
  - Track student progress
  - View student submissions
  - Monitor course analytics
  - Handle student communications

### Admin Dashboard
- URL: `http://localhost:3000/admin/dashboard`
- Features:
  - User management
  - Course oversight
  - Platform analytics
  - System settings
  - Revenue tracking

## 🎨 UI Components

The platform uses a custom UI component library built with:
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide icons for consistent iconography
- Custom animations and transitions

## 🔒 Authentication

Currently, authentication is temporarily disabled for testing purposes. The system uses:
- Supabase for authentication
- JWT tokens for session management
- Role-based access control (RBAC)

## 📱 Mobile Support

The platform is fully responsive and optimized for:
- Mobile devices
- Tablets
- Desktop computers
- Different screen sizes and orientations

## 🛠️ Development

### Project Structure
```
├── app/
│   ├── admin/         # Admin dashboard and features
│   ├── instructor/    # Instructor dashboard and features
│   ├── dashboard/     # Student dashboard
│   ├── components/    # Shared components
│   └── api/          # API routes
├── components/        # Global components
├── lib/              # Utility functions
├── public/           # Static assets
└── types/            # TypeScript type definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Linear.app and Pixelbin.io
- Icons by [Lucide](https://lucide.dev)
- UI components from [Radix UI](https://www.radix-ui.com)

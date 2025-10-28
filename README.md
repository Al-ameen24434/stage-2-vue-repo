# TicketFlow - Vue.js Version

A professional ticket management system built with **Vue 3**, **Vue Router**, and **Pinia**. Features a beautiful UI, complete authentication, and full CRUD operations - all powered by localStorage.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will run on `http://localhost:5001`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Tech Stack

- **Vue 3** - Progressive JavaScript framework using Composition API
- **Vue Router 4** - Official routing solution for Vue.js
- **Pinia** - Intuitive, type-safe state management
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Toastification** - Beautiful toast notifications
- **date-fns** - Modern JavaScript date utility library

## 🏗️ Project Structure

```
vue-version/
├── src/
│   ├── views/              # Page components
│   │   ├── Landing.vue     # Landing page with hero section
│   │   ├── Login.vue       # Login page
│   │   ├── Signup.vue      # Registration page
│   │   ├── Dashboard.vue   # Dashboard with stats
│   │   └── Tickets.vue     # Ticket management (CRUD)
│   ├── components/         # Reusable components
│   │   ├── Navbar.vue      # Navigation bar
│   │   ├── Footer.vue      # Footer component
│   │   └── StatusBadge.vue # Ticket status badges
│   ├── stores/             # Pinia stores
│   │   └── auth.js         # Authentication state
│   ├── router/             # Vue Router configuration
│   │   └── index.js        # Route definitions
│   ├── lib/                # Utilities
│   │   ├── auth.js         # Auth utilities
│   │   ├── tickets.js      # Ticket CRUD operations
│   │   └── initTestData.js # Test data initialization
│   ├── assets/             # Static assets
│   │   └── main.css        # Global styles
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Component Architecture

### Views (Pages)

**Landing.vue**
- Hero section with gradient background
- SVG wave decoration at bottom
- Decorative circle overlay
- Feature cards grid
- Call-to-action sections

**Login.vue** & **Signup.vue**
- Centered form layout
- Real-time validation
- Error messaging
- Toast notifications
- Test credentials display

**Dashboard.vue**
- Ticket statistics cards
- Quick action buttons
- Responsive grid layout

**Tickets.vue**
- Ticket list with cards
- Create/Edit dialogs
- Delete confirmation
- Status badges
- Empty state handling

### Shared Components

**Navbar.vue**
- Responsive navigation
- Mobile hamburger menu
- Conditional rendering (auth state)
- Logout functionality

**Footer.vue**
- Three-column grid layout
- Contact information
- Quick links

**StatusBadge.vue**
- Color-coded status indicators
- Props: `status` (open | in_progress | closed)

## 🔐 Authentication System

### How It Works

1. **Registration** (`/auth/signup`)
   - User provides name, email, and password
   - Form validation (email format, password length, confirmation match)
   - User data stored in localStorage under `ticketapp_users`
   - Automatic login after successful registration

2. **Login** (`/auth/login`)
   - Email and password validation
   - Session created and stored in localStorage under `ticketapp_session`
   - Redirects to Dashboard on success

3. **Session Management**
   - Pinia store (`useAuthStore`) manages auth state
   - Session persists across page refreshes
   - Protected routes redirect to login if unauthenticated

4. **Logout**
   - Clears session from localStorage
   - Resets Pinia auth state
   - Redirects to landing page

### Protected Routes

The router includes navigation guards that check authentication status:

```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login');
  } else {
    next();
  }
});
```

## 🎫 Ticket Management

### Data Structure

```javascript
{
  id: string,              // UUID
  title: string,           // Ticket title
  description: string,     // Detailed description
  status: string,          // 'open' | 'in_progress' | 'closed'
  priority: string,        // 'low' | 'medium' | 'high'
  createdAt: string,       // ISO datetime
  updatedAt: string,       // ISO datetime
  userId: string           // Owner's user ID
}
```

### CRUD Operations

**Create**
- Form with title, description, status, and priority
- Validation for required fields
- Toast notification on success

**Read**
- Filtered by current user
- Displayed in card layout
- Shows status badge, date, and priority

**Update**
- Edit dialog with pre-filled data
- Same validation as create
- Updates `updatedAt` timestamp

**Delete**
- Confirmation dialog
- Removes from localStorage
- Toast notification

### localStorage Keys

- `ticketapp_session` - Current user session
- `ticketapp_users` - All registered users
- `ticketapp_tickets` - All tickets (filtered by userId)

## 🎨 Styling Approach

### Tailwind CSS

This project uses Tailwind CSS with custom configuration:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      ticket: {
        open: { bg, text, border },
        in_progress: { bg, text, border },
        closed: { bg, text, border },
      },
    },
  },
}
```

### Custom CSS Classes

Defined in `src/assets/main.css`:

```css
.btn - Base button styles
.btn-primary - Primary action button
.btn-secondary - Secondary button
.btn-ghost - Minimal button
.btn-destructive - Delete/danger button
.card - Card container with shadow
.input - Form input styles
```

### Responsive Design

Mobile-first approach with these breakpoints:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px

## 🧪 Test Data

The application initializes with test data on first load:

**Test User:**
- Email: `test@test.com`
- Password: `123456`
- Name: `Test User`

**Sample Tickets:**
- 4 pre-created tickets with different statuses
- Demonstrates all ticket states (open, in_progress, closed)
- Various priority levels

## ♿ Accessibility Features

- ✅ Semantic HTML elements
- ✅ `data-testid` attributes for testing
- ✅ Keyboard navigation support
- ✅ Focus states on interactive elements
- ✅ ARIA labels where appropriate
- ✅ Color contrast compliance (WCAG AA)

## 🔧 Configuration Files

### vite.config.js

```javascript
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, '../assets'),
    },
  },
  server: {
    port: 5001,
  },
});
```

### tailwind.config.js

Custom colors for ticket statuses and Inter font configuration.

## 🐛 Known Issues

None currently. If you encounter issues:
1. Clear localStorage: `localStorage.clear()`
2. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
3. Check console for errors

## 📚 Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🎯 Key Differences from React Version

| Feature | Vue | React |
|---------|-----|-------|
| State Management | Pinia stores | Context API |
| Routing | Vue Router | Wouter |
| Reactivity | Vue reactivity system | useState hooks |
| Templates | Single File Components (.vue) | JSX in .tsx files |
| Styling | Scoped styles + Tailwind | Tailwind + shadcn/ui |
| Notifications | Vue Toastification | Custom toast system |

Both versions achieve identical functionality and visual design!

---

**Built with Vue 3 Composition API ⚡**

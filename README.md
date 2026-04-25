# 🎓 Al-Abqari Educational Platform

![Platform Banner](https://img.shields.io/badge/Status-In--Development-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?style=for-the-badge&logo=tailwind-css)
![React Query](https://img.shields.io/badge/React--Query-5-red?style=for-the-badge&logo=react-query)

An integrated educational platform designed to connect teachers with students, aiming to provide a seamless and professional learning experience using the latest web technologies. The platform focuses on providing advanced tools for teachers to manage content and quizzes with high efficiency.

---

## 🚀 Tech Stack

The project is built with a robust infrastructure to ensure speed, security, and an exceptional User Experience (UX):

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router) & TypeScript.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a Modern Soft UI design.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for lightweight and fast state handling.
- **Data Fetching:** [TanStack Query (React Query) v5](https://tanstack.com/query/latest) for API interaction and smart caching.
- **Components & Icons:** [Lucide React](https://lucide.dev/) & [Radix UI].
- **Notifications:** [Sonner] for interactive and sleek toast notifications.

---

## ✨ Core Features

### 👨‍🏫 Teacher Dashboard
- **Smart Quiz Creator:** Advanced system for adding questions that support multi-line text, code snippets, and auto-resizing input fields.
- **Auto Direction Control:** Full support for Arabic (RTL) and English (LTR) automatically adjusted based on the input content type.
- **Content Management:** Comprehensive system to upload and manage courses, subjects, and academic levels.
- **Profile Customization:** Instant updates for personal data and profile pictures using `FormData` and real-time mutation handling.

### 🎓 Student Experience
- **Interactive Quiz Interface:** Organized display of questions supporting code blocks and complex formatting.
- **Smooth Navigation:** High-speed page transitions powered by Server-side Rendering (SSR) and optimized caching.

### 🛠️ Technical Architecture
- **Proxy System:** Utilizing Next.js `rewrites` to bypass CORS issues and ensure secure Cookie exchange between Frontend and Backend.
- **Responsive Design:** Fully responsive layout that works efficiently across all devices (Mobile, Tablet, Desktop).

---

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Sherif-altiby/platform.git](https://github.com/Sherif-altiby/platform.git)
   cd platform

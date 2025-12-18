# TailorFlow

**Purpose**  
A modern e‑commerce platform for handcrafted garments and curated products. This repository contains the frontend (React + Tailwind + Framer Motion) and backend (Node/Express + MongoDB + Stripe) used to browse, customize, and order products with admin and manager dashboards.

**Live URL**  
[TailorFlow](https://tailorflow-f0731.web.app)

## Key features
- Responsive landing page with animated hero, featured products, testimonials, and CTA sections
- Product catalog with server-side pagination and product detail pages
- Secure authentication (Firebase Auth) and role-based access (buyer, manager, admin)
- Admin dashboard: manage users, suspend accounts, view orders
- Manager dashboard: create products, approve/reject orders, add tracking
- Checkout: Stripe Checkout integration and Cash-on-Delivery support
- Order tracking with generated tracking IDs
- Theme support: light/dark mode persisted in `localStorage` and applied via `data-theme`
- Image carousel (Swiper) and subtle Framer Motion animations
- Production-ready contact form with validation and spam protection hooks

## Tech stack & notable packages
- **Frontend**
  - React 18
  - React Router
  - Tailwind CSS + DaisyUI
  - Framer Motion
  - Swiper (carousel)
  - React Query (@tanstack/react-query)
  - Axios
- **Backend**
  - Node.js + Express
  - MongoDB (official driver)
  - Stripe (payments)
  - Firebase Admin (auth token verification)
- **Dev / tooling**
  - Vite
  - ESLint / Prettier (recommended)
  - dotenv

## Environment variables
Create a `.env` file.

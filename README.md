# Haroon's Interiors — Luxury Architecture & Interior Design Studio

A bespoke, high-end, responsive multi-page website and full-stack management system built for **Haroon's Interiors** (Lahore, Pakistan).

Designed around a distinctive **BLACK + LUXURY + ARCHITECTURE + EDITORIAL** aesthetic inspired by international architectural monographs: deep black (`#000000`, `#0A0A0A`), charcoal (`#151515`), thin architectural lines, numbered sections, large editorial typography, subtle warm gold accents (`#C9A86A`), and zero generic SaaS/template patterns.

---

## Business Information & Contact

- **Business Name:** Haroon's Interiors
- **Category:** Interior Designer
- **Direct Phone:** [+92 322 7535688](tel:+923227535688)
- **WhatsApp Inquiries:** [https://wa.me/923227535688](https://wa.me/923227535688)
- **Physical Address:** G8JC+4HH, Samars Plaza, Ferozpur Rd, Shah Jamal More, Ichhra, Ichhra Lahore, 54600, Pakistan
- **Social Media:** Authentic presentation (strictly zero fabricated social links, fake awards, or fake testimonials)

---

## Complete Pages Overview

1. **Home (`/`)**:
   - Editorial full-screen hero with *"Spaces With Character."*, Lahore indicator, and scroll cue.
   - `01 — OUR APPROACH`: Asymmetric editorial layout with architectural imagery.
   - `02 — WHAT WE DESIGN`: Interactive numbered vertical service list with dynamic hover image previews.
   - `03 — FEATURED PORTFOLIO`: Asymmetric masonry gallery showcase (major hero, tall portrait, wide panoramic, compact).
   - `04 — DESIGN PHILOSOPHY`: *"Less Noise. More Character."* (Balance, Materials, Light, Proportion, Function, Personality).
   - `05 — PROCESS PREVIEW`: 4-stage methodology timeline (Discover, Define, Develop, Deliver).
   - `06 — CTA SECTION`: Dramatic black section with direct `tel:` and WhatsApp triggers.
2. **About (`/about`)**:
   - Studio monograph covering the Lahore practice without unsupported claims.
   - Design philosophy breakdown (Function, Aesthetics, Comfort, Materials, Lighting, Proportion).
   - Our Approach: Large vertical image + text layout.
   - What We Value: 4 minimalist pillars (Detail, Function, Character, Quality).
3. **Services (`/services`)**:
   - 6 detailed disciplines:
     1. Residential Interior Design
     2. Commercial Interior Design
     3. Space Planning
     4. Interior Styling
     5. Wall & Surface Design
     6. Custom Interior Solutions
   - Includes descriptions, suitable spaces, key advantages, visual imagery, and direct booking CTAs.
4. **Portfolio (`/portfolio`)**:
   - Working real-time filtering: `ALL`, `RESIDENTIAL`, `COMMERCIAL`, `BEDROOM`, `LIVING`, `MODERN`, `DECORATIVE`.
   - Asymmetric masonry-style card grid with varying aspect ratios.
   - Transparent *"Sample / Demonstration Project"* identification badge.
5. **Project Details (`/portfolio/:id`)**:
   - Dynamic route powered by the backend API.
   - Large project visual hero, multiple thumbnail selector, design concept, architectural highlights, material specifications list, related projects in the same discipline, and consultation CTA.
6. **Process (`/process`)**:
   - Long scrolling editorial timeline through 5 rigorous architectural phases:
     - `01 — DISCOVERY`
     - `02 — CONCEPT`
     - `03 — PLANNING`
     - `04 — EXECUTION`
     - `05 — FINAL DETAIL`
7. **FAQ (`/faq`)**:
   - Smooth animated accordion with answers to the 7 core client questions.
8. **Contact (`/contact`)**:
   - Verified business address, phone, direct WhatsApp link, and working interactive Google Maps embed for Samars Plaza, Ferozpur Road, Ichhra, Lahore.
   - Form with strict validation (Name, Phone, Service, Message, Email regex).
   - Connected directly to backend lead collection API with instant success/error feedback and form reset.
9. **Admin Portal (`/admin/login` & `/admin`)**:
   - Protected JWT authentication with bcrypt password hashing.
   - Studio stats (Total Projects, Total Inquiries, New Leads, Completed).
   - Project CRUD: Add new project modal, Edit project, Delete project, toggle featured status on Home.
   - Inquiry Management: List customer leads, search filter, view full inquiry modal, update status (`new`, `contacted`, `in_progress`, `completed`), delete lead, and quick WhatsApp trigger.
10. **404 Not Found (`*`)**:
    - Bespoke architectural 404 page with return navigation actions.

---

## Technical Stack

- **Frontend**:
  - React 18
  - React Router v6
  - Tailwind CSS (custom dark editorial palette)
  - Lucide React icons
  - Vite 6
- **Backend**:
  - Node.js & Express.js
  - MongoDB & Mongoose
  - Resilient Dual-Layer Persistence (seamlessly falls back to a persistent JSON storage engine if MongoDB daemon is not running locally, guaranteeing 100% testability and zero crashes out-of-the-box)
  - JWT Authentication & Bcrypt Password Hashing

---

## Getting Started

### 1. Prerequisites
- Node.js v18+ and npm installed.

### 2. Backend Setup
```bash
cd backend
npm install
node seed.js    # Seeds initial architectural projects, demo leads, and default admin
npm start       # Runs backend server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Runs Vite development server on http://localhost:5173
```

### 4. Admin Access
- **URL**: `http://localhost:5173/admin/login`
- **Email**: `admin@haroonsinteriors.com`
- **Password**: `Haroon@Admin2026!`
*(Convenient "Click to autofill" button available on login page)*

---

## Production Build Verification
To compile the frontend for production:
```bash
cd frontend
npm run build
```
Build output is saved to `frontend/dist` with zero errors.

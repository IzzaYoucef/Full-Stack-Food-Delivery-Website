# Full-Stack Food Delivery Website

A food delivery app built with the MERN stack (MongoDB, Express, React, Node.js). Customers can browse the menu, manage a cart, sign up, and pay with Stripe. An admin panel manages the menu and orders.

## Tech Stack

- **Frontend / Admin:** React 19, Vite, React Router, Axios
- **Backend:** Node.js, Express 5, Mongoose, JWT, Multer, Stripe
- **Database:** MongoDB
- **DevOps:** Docker, Docker Compose

## Setup

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://db:27017/food-delivery // i will past thé data base uro if it's necessary to will be able to run in any device
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=sk_test_xxxxxxxx
```

## Run with Docker

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up --build -d
```

Stop:

```bash
docker compose down
```

Stop and delete data:

```bash
docker compose down -v
```

## Run without Docker

```bash
# backend (set MONGODB_URI=mongodb://localhost:27017/food-delivery in .env)
cd backend && npm install && npm run server

# frontend
cd frontend && npm install && npm run dev

# admin
cd admin && npm install && npm run dev
```

## Notes

- The database starts empty. Add dishes from the admin panel first.
- Test Stripe card: `4242 4242 4242 4242`.
- `compose.yml` must use `MONGODB_URI` and `VITE_BACKEND_URL` (not `DB_URL` / `VITE_API_URL`) and include an `admin` service on port `5174`.

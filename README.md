# 🛍️ THE DRIP STORE

**The Drip Store** is a full-stack MERN e-commerce web application developed as a college project for a clothing brand. It provides a complete online shopping experience where users can browse products, manage their cart, and place secure orders.

🔗 **Live Website:** https://the-drip-store-x2h2.vercel.app/
📂 **GitHub Repository:** https://github.com/vaghelashailesh21/The-Drip-Store

---

## 📌 Project Overview

With the rise of online shopping, this project aims to build a **modern, scalable, and user-friendly e-commerce platform**. It allows clothing brands to manage their products and customers while providing users with a seamless shopping experience.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Browse products with images and details
* Add / Remove items from cart
* Update product quantity in cart
* Secure checkout process
* Order placement & confirmation
* View order history
* Forgot Password (Email via Nodemailer)

---

### 🛠️ Admin Features

* Admin Dashboard
* Add / Edit / Delete products
* Manage users
* Manage orders
* Inventory control

---

## 💳 Payment Integration

This project integrates **Razorpay** for secure online transactions.

### Payment Features:

* Razorpay order creation
* Secure checkout popup
* Payment verification using backend
* Supports UPI, Cards, Net Banking

### Payment Flow:

1. User clicks **Checkout**
2. Backend creates Razorpay order
3. Razorpay popup opens
4. User completes payment
5. Backend verifies payment signature
6. Order marked as **Paid**

---

## 🧰 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* React Router
* React Skeleton Loader
* Sonner (Toast Notifications)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other Integrations

* Cloudinary (Image Upload)
* Nodemailer (Email Services)
* Razorpay (Payment Gateway)

---

## 📁 Project Structure

```bash
The-Drip-Store/
│
├── frontend/          # React Frontend
│   ├── components/
│   ├── pages/
│   ├── Redux/
│   └── App.js
│
├── backend/           # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/vaghelashailesh21/The-Drip-Store.git
cd The-Drip-Store
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

| Variable        | Description               |
| --------------- | ------------------------- |
| MONGO_URI       | MongoDB connection string |
| JWT_SECRET      | Authentication secret     |
| RAZORPAY_KEY_ID | Razorpay public key       |
| RAZORPAY_SECRET | Razorpay secret key       |
| CLOUDINARY_*    | Cloudinary credentials    |
| EMAIL_USER      | Email for sending mails   |
| EMAIL_PASS      | Email password            |

---

## 🧪 Testing

* Manual Testing (UI & Functional)
* API Testing using Postman
* Integration Testing (Frontend + Backend)

---

## 📊 Reports Generated

* User Report
* Product Report
* Order Report
* Sales Report
* Payment Report (Razorpay)

---

## 🔮 Future Enhancements

* Order Tracking System
* Product Reviews & Ratings
* Wishlist Feature
* Mobile Application (Android/iOS)
* AI-based Recommendations
* Return & Refund System
* Cash on Delivery (COD)

---

## 👨‍💻 Author

**Shailesh Vaghela**

* MCA (2025–26)
* Indus University

GitHub: https://github.com/vaghelashailesh21

---

## 📜 License

This project is developed for **educational purposes**.

---

## ⭐ Acknowledgement

Special thanks to:

* Faculty guidance and mentorship
* Industry support during development
* Open-source technologies used in this project

---

⭐ If you like this project, consider giving it a star on GitHub!

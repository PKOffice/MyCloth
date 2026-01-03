# 👗 MyCloth – Innerwear & Bespoke Clothing UI

🌐 **Live Demo:** https://myclothweb.netlify.app/

MyCloth is a **high-end, responsive frontend UI application** for an innerwear and bespoke clothing brand. This project currently focuses on the **user interface (UI)**, providing a premium shopping experience with modern design, smooth animations, and scalability for future backend and AI integrations.

---

## ✨ Features
a
- 🧵 Premium UI for innerwear & clothing products
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔍 Smart product search (UI-ready)
- 🛒 Cart interface (frontend only)
- 🎨 Smooth animations using GSAP
- ⚡ Fast build & performance using Vite
- 🔥 Firebase-ready frontend integration
- 🤖 AI-powered product insights (planned – backend in progress)

---

## 🛠 Tech Stack

### Frontend
- **React 19** – UI library
- **Vite** – Fast build tool
- **GSAP** – Animations
- **Firebase SDK** – Frontend integration ready

### Backend (In Progress 🚧)
- **Node.js + Express**
- **MongoDB (Mongoose)**
- **Google GenAI** for AI-powered insights

> ⚠️ Note: Backend services are under development and are not deployed yet.

---

## 📦 Project Metadata

```json
{
  "name": "MyCloth",
  "description": "A high-end, responsive product listing page for bespoke clothing essentials with smart search, cart functionality, and AI-powered product insights."
}
```

---

## 📁 Project Structure

```
mycloth-atelier/
├── src/            # React components & pages
├── public/         # Static assets
├── dist/           # Production build (generated)
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd mycloth-atelier
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the development server
```bash
npm run start
```

The app will run at:
```
http://localhost:3000
```

---

## 🏗 Build for Production

```bash
npm run build
```

This will generate a `dist/` folder used for deployment.

---

## 🌍 Deployment

The frontend is deployed using **Netlify**.

🔗 **Production URL:** https://myclothweb.netlify.app/

Netlify Configuration:
- Build Command: `npm run build`
- Publish Directory: `dist`

---

## 🔐 Environment Variables (Frontend)

Create a `.env` file for frontend-only variables:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
```

> Backend API URL will be added once the server is live.

---

## 🧠 Future Enhancements

- ✅ Backend API integration
- 🤖 AI-based product recommendations
- 🛍 Checkout & payment gateway
- 🔐 Authentication & user profiles
- 📦 Order management system

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is currently for **learning and demonstration purposes**.

---

### 👤 Author (Prathmesh Kamble)

**MyCloth UI Project**  
Crafted with ❤️ for modern fashion commerce

---

If you like this project, feel free to ⭐ the repository!


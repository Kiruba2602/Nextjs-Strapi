---

# Next.js 15 & Strapi 5 Integration

This repository demonstrates a powerful full-stack application using **Next.js 15** for the frontend and **Strapi 5** as the backend. It serves as a boilerplate or starting point for building modern web applications with seamless API integration.

---

## 🛠 Features

### Frontend (Next.js 15)
- **Server-side Rendering (SSR)** and **Static Site Generation (SSG)** support.
- Dynamic routing and API integration.
- Fully responsive and modern UI using Tailwind CSS.
- SEO-friendly with meta tag management using `next/head`.
- Environment variable support for secure API communication.

### Backend (Strapi 5)
- Headless CMS with a clean admin interface.
- Easily manageable content types.
- Flexible role-based access controls.
- RESTful APIs and GraphQL support.
- Media library for asset management.

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- Node.js (16.x or later)
- npm or Yarn
- Strapi CLI (`npm install -g @strapi/strapi`)

---

## 📂 Project Structure

### Frontend (`frontend`)
The `frontend` folder contains the Next.js 15 application.

Key directories:
- `pages/`: Contains the main Next.js pages.
- `components/`: Reusable UI components.
- `styles/`: Tailwind CSS configuration and global styles.

### Backend (`backend`)
The `backend` folder contains the Strapi 5 application.

Key directories:
- `api/`: Contains the API configurations.
- `components/`: Strapi custom components.
- `config/`: Environment settings for Strapi.
- `extensions/`: Plugin customization for Strapi.

---

## 🖥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kiruba2602/Nextjs-Strapi.git
   cd Nextjs-Strapi
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in both `frontend` and `backend` folders.
   - Add the required environment variables:
     #### Frontend `.env`
     ```
     NEXT_PUBLIC_API_URL=http://localhost:1337/api
     ```
     #### Backend `.env`
     ```
     DATABASE_CLIENT=sqlite
     DATABASE_FILENAME=./data.db
     APP_KEYS=your_app_keys
     API_TOKEN_SALT=your_api_token_salt
     ADMIN_JWT_SECRET=your_admin_jwt_secret
     ```

---

## 🔧 Running the Application

1. **Start Strapi Backend**:
   ```bash
   cd backend
   npm run develop
   ```

   Strapi will run at `http://localhost:1337`.

2. **Start Next.js Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will run at `http://localhost:3000`.

---

## 📖 Usage

### Adding Content in Strapi
1. Navigate to `http://localhost:1337/admin` and log in.
2. Create content types and populate data using the Strapi admin panel.
3. Fetch the content using the REST API or GraphQL.

### Accessing the Frontend
- View the application at `http://localhost:3000`.
- Navigate through dynamic pages populated with Strapi data.

---

## 📚 Documentation

- **Next.js**: [Official Documentation](https://nextjs.org/docs)
- **Strapi**: [Official Documentation](https://docs.strapi.io/)

---

## 🛡️ Security Notes

- Store sensitive information like API keys and database credentials in `.env` files.
- Use HTTPS in production to secure API communication.

---

## 🧪 Testing

- Add tests for the frontend using **Jest** or **Playwright**.
- Write backend API tests with **Jest** or **Supertest**.

---

## 🛠 Deployment

### Frontend
1. Build the Next.js application:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy to platforms like Vercel, Netlify, or AWS.

### Backend
1. Deploy the Strapi application to services like Heroku, AWS, or DigitalOcean.
2. Use a production-grade database like PostgreSQL or MongoDB for Strapi.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Developed by [Kiruba2602](https://github.com/Kiruba2602).

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

--- 

Feel free to replace or modify the placeholders and paths to better match your specific project setup.

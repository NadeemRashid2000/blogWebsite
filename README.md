# MyBlog: A Full-Stack MERN Blog Application

##  Description

**Welcome to MyBlog!**  
**MyBlog** is a personal blog website I built with the MERN stack and MDX.  
It’s where I write and share my articles on programming, tech, and development.

The site includes a private admin panel with a built-in markdown editor for easy post creation and management — all designed and controlled by me.

<br/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd frontend
$ npm install   //(to install frontend-side dependencies)
$ npm run  dev   //(to start the frontend)

```

- Create `.env` file under backend/.env 
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
    PORT=5000
    MONGO_URI=<your_mongo_db_url >
    JWT_SECRET=<your-jwt-secret>
```
    
In the second terminal

```
# --- Second Terminal ---
$ cd backend
$ npm install   // (to install backend-side dependencies)
$ nodemon server.js //( to start the backend)
```

## 🔑 Key Features

- ✨ Create and publish blog articles using MDX (Markdown + JSX)
- 🔐 User authentication using JWT (JSON Web Tokens)
- 🛡️ Admin account auto-created on server startup via `createAdmin.js` (admin-only access protected)
- 🖋️ Rich blog editing with live Markdown preview using `react-md-editor`
- 📁 Upload and display user profile images and blog cover images
- 🧠 Support for blog metadata via frontmatter (e.g., `title`, `description`, `slug`, `category`)
- 🧹 Blog deletion and update (CRUD) for authenticated users
- 🎨 Clean and responsive UI styled with TailwindCSS and `@tailwindcss/typography`
- ⚡ Fast build and dev experience using Vite + optimized React setup
- 🗂️ Organized folder structure and RESTful backend with Express
- 📱 Fully responsive design — mobile and desktop friendly


<br/>

## 🚀 Technologies Used

This project was created using the following technologies:

---

### 🖥️ Frontend

- [**React.js**](https://www.npmjs.com/package/react) – JavaScript library for building user interfaces
- [**React Router DOM**](https://www.npmjs.com/package/react-router-dom) – Declarative routing for React apps
- [**TailwindCSS**](https://tailwindcss.com/) – Utility-first CSS framework for styling
- [**@tailwindcss/typography**](https://github.com/tailwindlabs/tailwindcss-typography) – Tailwind plugin for rich text content
- [**Vite**](https://vitejs.dev/) – Fast frontend tooling and build tool
- [**MDX**](https://mdxjs.com/) (`@mdx-js/mdx`, `@mdx-js/react`) – Markdown + JSX support for blog articles
- [**React Markdown Editor**](https://github.com/uiwjs/react-md-editor) (`@uiw/react-md-editor`) – Markdown editor component
- [**Markdown Preview**](https://github.com/uiwjs/react-markdown-preview) (`@uiw/react-markdown-preview`) – Live markdown preview
- [**Gray-Matter**](https://www.npmjs.com/package/gray-matter) – Parses frontmatter metadata from markdown files
- [**Axios**](https://www.npmjs.com/package/axios) – Promise-based HTTP client for API calls
- [**JWT Decode**](https://www.npmjs.com/package/jwt-decode) – Decode JSON Web Tokens on the client
- [**Remark Plugins**](https://remark.js.org/) – Extended markdown parsing (`remark-frontmatter`, `remark-mdx-frontmatter`, `remark-gfm`)
- [**Rehype Plugins**](https://rehype.js.org/) – HTML transformation in MDX (`rehype-highlight`, `rehype-raw`, `rehype-mdx-import-media`)

---

### ⚙️ Backend

- [**Node.js**](https://nodejs.org/) – JavaScript runtime for building server-side applications
- [**Express.js**](https://expressjs.com/) – Web framework for building APIs
- [**Mongoose**](https://mongoosejs.com/) – MongoDB object modeling for Node.js
- [**Dotenv**](https://www.npmjs.com/package/dotenv) – Loads environment variables from `.env`
- [**BcryptJS**](https://www.npmjs.com/package/bcryptjs) – Password hashing for authentication
- [**JSON Web Token**](https://www.npmjs.com/package/jsonwebtoken) – Secure token-based authentication
- [**CORS**](https://www.npmjs.com/package/cors) – Cross-Origin Resource Sharing middleware
- [**Nodemon**](https://www.npmjs.com/package/nodemon) – Auto-restarts server on changes during development

---

### 🗄️ Database

- [**MongoDB**](https://www.mongodb.com/) – NoSQL database used for storing users, blogs, and metadata

 ##  Screenshots 

 ### Home Page
 ![Screenshot 1](https://github.com/user-attachments/assets/2c86ed45-d2e5-4687-bd33-d633d11b6087)

---
 ### Blog Page
![Screenshot 2](https://github.com/user-attachments/assets/40542bca-5eca-4342-bf23-25642ed9965e)

---
### Create Blog With Editor
![Screenshot 3](https://github.com/user-attachments/assets/edfb833c-4b3f-4fcd-9ed1-590e3cee6a0a)



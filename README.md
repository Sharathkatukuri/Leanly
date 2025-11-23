# 📌 **Leanly – URL Shortener (TinyLink Assignment)**  
A simple and efficient URL shortener similar to **Bit.ly**, built using **Node.js**, **Express**, **MongoDB**, and **EJS**.  
Users can create short URLs, view stats, and manage links from a clean dashboard interface.

---

## 🚀 **Features**
- 🔗 **Create Short Links** — Convert long URLs into short, shareable codes.  
- 🎯 **Redirect Handling** — Visiting `/{code}` redirects to original URL.  
- 📊 **Stats Page** — View clicks, last clicked time, and click history (IP, UA, referrer).  
- 🗂️ **Dashboard** — Manage all links with actions:  
  - View Stats  
  - Copy Short Link  
  - Delete Link  
- 🧹 **Clean & Responsive UI** using Bootstrap.  
- 🩺 **Health Check Endpoint** at `/healthz`.  

---

## 🛠 **Tech Stack**
### **Frontend**
- EJS (Server-Side Rendering)
- Bootstrap 5
- JavaScript (Vanilla)

### **Backend**
- Node.js  
- Express.js  
- Mongoose (MongoDB ODM)

### **Database**
- MongoDB Atlas (Production)  
- MongoDB Local (Development)

### **Hosting**
- Render (Node + Express Deployment)

---

## 📁 **Project Structure**
```plaintext
Leanly/
├── models/
│ └── links.js # Mongoose schema
├── node_modules/    # Node.js dependencies
├── public/          # Static files (CSS, JS, images)
│   ├── css/         # Stylesheets
│   │   └── style.css
│   ├── js/          # Client-side scripts
│       └── script.js
├── views/           # EJS templates
│   ├── layouts/     # Layout templates
│   │   └── boilerplate.ejs
│   ├── includes/    # Reusable components
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── Home.ejs
|   ├── stats.ejs
├── app.js           # Main Express server
├── package.json     # Project metadata and dependencies
├── .env             # Environment variables
└── README.md        # Project documentation
```

## Installation and Setup

Follow these steps to set up and run Leanly on your local machine:

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/).
- **MongoDB**: Install and run MongoDB on your system or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Step-by-Step Guide

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Leanly.git
   cd Leanly
   ```
2. **Install Dependencies**:
   Since the `node_modules` folder is already included, this step is optional. However, if needed, run:
   ```bash
   npm install
   ```
3. **Install Required Packages** (if missing):
   - Install `nodemon` for development:
     ```bash
     npm install -g nodemon
     ```
   - Install specific dependencies:
     ```bash
     npm install express ejs mongoose dotenv ejs-mate 
     ```
4. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     BASE_URL=http://localhost:3000
     MONGO_URL=mongodb://127.0.0.1:27017/Leanly
     ```
   - Production (Render):
     ```env
     BASE_URL=https://yourapp.onrender.com
     MONGO_URL=YOUR_MONGODB_ATLAS_URI
     ```

5. **Initialize the Database** (Optional):
   If required, populate the database with initial data:
   ```bash
   node init/index.js
   ```

6. **Start the Server**:
   - For development (with `nodemon`):
     ```bash
     nodemon app.js
     ```
   - Without `nodemon`:
     ```bash
     node app.js
     ```

7. **Access the Application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Running the Application

- Ensure MongoDB is running locally or accessible via the connection string.
- Use the routes in `app.js` to manage longlinks.
- Customize the `public/css/style.css` and `views` for design changes.

## Contributing

Contributions are welcome! 
This project is actively under development, and new features and improvements are being added. Everyone is welcome to contribute and help enhance Leanly!
If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on GitHub.

## Acknowledgments

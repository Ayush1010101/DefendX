# DefendX
Let's Do It.

To set up a development environment using **Node.js** as the backend and **React.js** as the frontend in **VS Code**, follow these steps:

### Step 1: Install Prerequisites
Ensure you have the following installed on your machine:
1. **Node.js** (Download from [Node.js official site](https://nodejs.org/)).
2. **VS Code** (Download from [VS Code official site](https://code.visualstudio.com/)).

To check if Node.js and npm are installed, run the following commands in your terminal:
```bash
node -v
npm -v
```

### Step 2: Create Backend (Node.js + Express) Application
1. Open VS Code and create a directory for your project (e.g., `my-fullstack-app`).

2. In the terminal, navigate to the project directory and initialize a **Node.js** project:
   ```bash
   mkdir my-fullstack-app
   cd my-fullstack-app
   npm init -y
   ```

3. Install **Express.js** for backend development:
   ```bash
   npm install express
   ```

4. Create a basic Express server:
   - Inside `my-fullstack-app`, create a directory `backend` for the backend code:
     ```bash
     mkdir backend
     ```
   - Inside the `backend` directory, create a file named `index.js` and write the following code:

   ```javascript
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 5000;

   app.get('/', (req, res) => {
     res.send('Hello from the backend!');
   });

   app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

5. Modify the `package.json` to include a start script for your backend:
   In the root of `my-fullstack-app`, edit the `package.json`:
   ```json
   "scripts": {
     "start-backend": "node backend/index.js"
   }
   ```

6. To start the backend server, run:
   ```bash
   npm run start-backend
   ```

### Step 3: Create Frontend (React.js) Application
1. Navigate back to the root directory (`my-fullstack-app`) and create the React app using `create-react-app`:
   ```bash
   npx create-react-app frontend
   ```

2. This will create a new directory `frontend` containing the React.js project.

3. Navigate into the `frontend` directory:
   ```bash
   cd frontend
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser to see the default React application running.

### Step 4: Connect Backend and Frontend
To connect the React frontend with the Node.js backend, follow these steps:

1. **Create an API call in the React app**:
   - Open the `frontend/src/App.js` file, and modify it to fetch data from your backend:

   ```javascript
   import React, { useEffect, useState } from 'react';

   function App() {
     const [message, setMessage] = useState('');

     useEffect(() => {
       fetch('/api')
         .then((res) => res.text())
         .then((message) => {
           setMessage(message);
         });
     }, []);

     return (
       <div className="App">
         <header className="App-header">
           <p>{message}</p>
         </header>
       </div>
     );
   }

   export default App;
   ```

2. **Proxy API requests to the backend**:
   - To avoid CORS issues, configure React to proxy API requests to your Node.js backend. Add the following line to the `frontend/package.json` file:

   ```json
   "proxy": "http://localhost:5000",
   ```

   This will forward API requests from the React frontend to the Node.js backend.

3. **Update Backend to Serve API**:
   - In `backend/index.js`, modify the `/` route to serve data for the frontend request:

   ```javascript
   app.get('/api', (req, res) => {
     res.send('Hello from the backend!');
   });
   ```

4. **Run both servers**:
   - Open a terminal in the `my-fullstack-app` directory.
   - Run the backend server:
     ```bash
     npm run start-backend
     ```
   - In a separate terminal, navigate to the `frontend` directory and start the frontend server:
     ```bash
     cd frontend
     npm start
     ```

### Step 5: Test the Integration
1. Open your browser and go to `http://localhost:3000`. You should see the message "Hello from the backend!" coming from the Node.js server, fetched by the React frontend.

### Step 6: Optional - Install Nodemon for Auto-Restart
To automatically restart your Node.js server on code changes, install **Nodemon**:

```bash
npm install --save-dev nodemon
```

Modify your backend `package.json` to use `nodemon`:
```json
"scripts": {
  "start-backend": "nodemon backend/index.js"
}
```

Now when you run `npm run start-backend`, the server will automatically restart when you change backend code.

---
Here’s how your project directory structure will look like for the **Node.js backend** and **React frontend** setup:

```
my-fullstack-app
│   package.json         # Root package.json for backend and frontend scripts
│
├── backend              # Backend folder (Node.js + Express)
│   │   index.js         # Main file for backend (Express server)
│   └── package.json     # Backend-specific package.json for Node dependencies
│
└── frontend             # Frontend folder (React app)
    ├── public           # Public directory for static assets (HTML, favicon, etc.)
    ├── src              # Source directory for React components and logic
    │   ├── App.js       # Main React component making the API call
    │   └── index.js     # Entry point for the React application
    ├── package.json     # Frontend-specific package.json for React dependencies
    └── node_modules     # Node modules for the frontend
```



### Recap of Commands:
- **Start backend**: `npm run start-backend`
- **Start frontend**: `npm start` (in `frontend` directory)

This setup gives you a working **Node.js backend** and **React frontend**, both running simultaneously for full-stack development in **VS Code**.

# NordRedo - Backend

This is the API servies for NordRedo.

RESTful API that tracks events and lets users signup and signout that there will.

# Setup
## 1 (Server)
Setup postgresSQL server on your device
## 2 (.env)
These need to be in the .env file <br>
1. <code>HOST=X(the host address)</code> <br>
2. <code>PORT=X(Port of open host)</code> <br>
3. <code>DATABASE_URL= postgres://(database):(password)@(username)/(schema)</code> <br>
4. <code>JWT_SECRET=(The secret)</code> <br>
5. <code>FRONTEND_URL=(frontend-url)</code>
## 3 (npm)
<code> npm install </code>
## 4 (node scripts)
<code> npm run setup </code>
<code> npm run start </code>

## Final
Everything should be setup for the backend application to run

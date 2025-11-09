
# A not-simple ToDo List

### Tech Stack Used

1. NodeJS(v22.19.0)
2. ExpressJS(v5.1.0)
3. PostgreSQL(v18.0)

### Features
1. Multi-user and multi-session friendly, uses cookies for session persistence. Hashed passwords are stored in db ofcourse.
2. Sends Emails(required during signups) to users daily for their respective tasks next day(if any).
3. Main branch runs on RESTful APIs and websocket branch is real-time, uses websockets(socket.io).
4. Rate limiting is applied on server side (socket throttling in websockets).

### Security Features
1. Parameterized queries to prevent SQL injection.
2. Rate limiting on server side to prevent DOS attack.
3. Authentication and session check for every request and routes.

Clone the repo using
```
git clone https://github.com/singhanshuman01/Simple-todo-list.git
```

Then install the necessary node modules and packages
```
npm i
npm i nodemon
```
Open your terminal in the same folder and run
```
psql -U <your-username> -d <your-dbname> -h localhost
//enter you password

//run
\i ./schema.sql
```

Create your .env file with following variables
```
PORT=
DB_HOST=
DB_USER=
DB_PORT=
DB_NAME=
DB_PASSWORD=
EMAIL_FROM=
APP_PASS=
```

## Once you've completed this setup, time to run it
```
npm run start
//or
npm start
```
You can view the page on localhost and specified port.

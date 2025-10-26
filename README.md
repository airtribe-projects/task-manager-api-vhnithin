*****Task Manager API*****

** About **

A project to build a RESTful Tasks API using Node.js and Express.js, implementing basic CRUD operations, input validation, and robust error handling. The API can be tested using Postman.

install node
install express
 - npm install express

**Features **

- Create, Read, Update, and Delete tasks (CRUD operations)
- Sort tasks by creation date
- Filter tasks by completion status
- Filter tasks by priority level
- Task attributes include:
  - Title
  - Description
  - Completion status
  - Priority level (high, medium, low)
  - Creation date

** API Endpoints **

** GET Endpoints **
- `GET /` - Welcome message
- `GET /tasks` - Retrieve all tasks (sorted by newest first)
- `GET /tasks?completed=true` - Get completed tasks
- `GET /tasks/:id` - Get task by ID
- `GET /tasks/:level` - Get tasks by priority level

** POST Endpoint **
- `POST /tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "completed": false,
    "priority": "high"
  }
  ```

** PUT Endpoint **
- `PUT /tasks/:id` - Update a task
  ```json
  {
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "priority": "medium"
  }
  ```

 ** DELETE Endpoint **
- `DELETE /tasks/:id` - Delete a task


 ** Setup  **

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

 ** Dependencies  **

- Express.js


 ** Data Structure  **

Tasks are stored in a JSON file with the following structure:
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "createdAt": "2023-01-15T10:00:00Z",
  "priority": "high"
}
```

 ** Error Handling  **

- 404: Resource not found
- 400: Invalid request data
- 200: Successful operation
- 201: Resource created successfully

 ** Testing  **

Run tests using:
```bash
npm test
```
